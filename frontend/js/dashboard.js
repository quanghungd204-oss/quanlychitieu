// Chart instances storage
let categoryChartInstance = null;
let incomeExpenseChartInstance = null;
// Check authentication
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const token = getToken();
    console.log('✓ Token check:', token ? 'Found' : 'Not found');
    
    if (!token) {
      window.location.href = '/index.html';
      return;
    }

    // Set user info
    const user = getUser();
    if (user && document.getElementById('userInfo')) {
      document.getElementById('userInfo').textContent = `Xin chào, ${user.username}!`;
    }

    // Load initial data
    console.log('✓ Loading initial data...');
    try {
      await loadWallets();
    } catch (e) { console.error('❌ loadWallets error:', e.message); }
    
    try {
      await loadCategories();
    } catch (e) { console.error('❌ loadCategories error:', e.message); }
    
    try {
      await loadTransactions();
    } catch (e) { console.error('❌ loadTransactions error:', e.message); }
    
    try {
      await loadOverview();
    } catch (e) { console.error('❌ loadOverview error:', e.message); }

    // Populate wallet filter - safe check
    if (document.getElementById('transWalletId')) {
      try {
        const wallets = await walletAPI.getWallets();
        if (wallets && wallets.wallets) {
          const walletSelect = document.getElementById('filterWallet');
          const transWalletSelect = document.getElementById('transWalletId');
          
          wallets.wallets.forEach(wallet => {
            try {
              const option = document.createElement('option');
              option.value = wallet._id;
              option.textContent = wallet.name;
              if (walletSelect) walletSelect.appendChild(option);
              
              const option2 = document.createElement('option');
              option2.value = wallet._id;
              option2.textContent = wallet.name;
              if (transWalletSelect) transWalletSelect.appendChild(option2);
            } catch (e) {
              console.error('❌ Error adding wallet option:', e.message);
            }
          });
        }
      } catch (e) {
        console.error('❌ Error loading wallets for filter:', e.message);
      }

      // Set today's date as default
      try {
        document.getElementById('transDate').valueAsDate = new Date();
      } catch (e) {
        console.error('❌ Error setting date:', e.message);
      }
    }
    
    console.log('✓ Dashboard initialized successfully!');
  } catch (error) {
    console.error('❌ Critical error in dashboard initialization:', error);
  }
});

// Tab switching
const switchTab = (tabName) => {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.add('hidden');
  });
  
  // Remove active from all buttons
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  // Show selected tab
  document.getElementById(tabName).classList.remove('hidden');
  
  // Add active to clicked button
  event.target.closest('button').classList.add('active');
};

// OVERVIEW
const loadOverview = async () => {
  try {
    const wallets = await walletAPI.getWallets();
    const transactions = await transactionAPI.getTransactions({ limit: 1000 });

    const totalBalance = wallets.totalBalance;
    document.getElementById('totalBalance').textContent = formatCurrency(totalBalance);

    // Calculate income and expense
    let totalIncome = 0;
    let totalExpense = 0;
    transactions.transactions.forEach(trans => {
      if (trans.type === 'income') {
        totalIncome += trans.amount;
      } else {
        totalExpense += trans.amount;
      }
    });

    document.getElementById('totalIncome').textContent = formatCurrency(totalIncome);
    document.getElementById('totalExpense').textContent = formatCurrency(totalExpense);

    // Wallets overview
    const walletsDiv = document.getElementById('walletsOverview');
    walletsDiv.innerHTML = '';
    wallets.wallets.forEach(wallet => {
      const walletCard = document.createElement('div');
      walletCard.className = 'card';
      walletCard.innerHTML = `
        <div class="card-header">
          <div class="card-title">${wallet.name}</div>
          <div style="color: #667eea; font-weight: bold; font-size: 18px;">
            ${formatCurrency(wallet.balance)}
          </div>
        </div>
        <div style="font-size: 12px; color: #999;">
          Cập nhật lần cuối: ${formatDate(wallet.updatedAt)}
        </div>
      `;
      walletsDiv.appendChild(walletCard);
    });

    // Charts
    renderCharts(transactions.transactions);
  } catch (error) {
    console.error(error);
  }
};

const renderCharts = (transactions) => {
  try {
    // Destroy old charts before creating new ones
    if (categoryChartInstance) {
      categoryChartInstance.destroy();
      categoryChartInstance = null;
    }
    if (incomeExpenseChartInstance) {
      incomeExpenseChartInstance.destroy();
      incomeExpenseChartInstance = null;
    }

    // Category chart
    const categoryData = {};
    transactions.forEach(trans => {
      if (trans.type === 'expense') {
        const categoryName = trans.category.name;
        categoryData[categoryName] = (categoryData[categoryName] || 0) + trans.amount;
      }
    });

    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    categoryChartInstance = new Chart(categoryCtx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(categoryData),
        datasets: [{
          data: Object.values(categoryData),
          backgroundColor: ['#667eea', '#764ba2', '#ff6b6b', '#51cf66', '#ffc107', '#00d4ff'],
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    });

    // Income vs Expense chart
    let totalIncome = 0;
    let totalExpense = 0;
    transactions.forEach(trans => {
      if (trans.type === 'income') totalIncome += trans.amount;
      else totalExpense += trans.amount;
    });

    const incomeExpenseCtx = document.getElementById('incomeExpenseChart').getContext('2d');
    incomeExpenseChartInstance = new Chart(incomeExpenseCtx, {
      type: 'bar',
      data: {
        labels: ['Thu nhập', 'Chi tiêu'],
        datasets: [{
          label: 'Số tiền (VND)',
          data: [totalIncome, totalExpense],
          backgroundColor: ['#51cf66', '#ff6b6b'],
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        indexAxis: 'y',
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            beginAtZero: true,
          },
        },
      },
    });
  } catch (error) {
    console.error('❌ Error rendering charts:', error.message);
  }
};

// WALLETS
const loadWallets = async () => {
  try {
    const data = await walletAPI.getWallets();
    const list = document.getElementById('walletsList');
    list.innerHTML = '';

    data.wallets.forEach(wallet => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="card-header">
          <div>
            <div class="card-title">${wallet.name}</div>
            <div style="font-size: 12px; color: #999;">${formatDate(wallet.createdAt)}</div>
          </div>
          <div style="text-align: right;">
            <div style="color: #667eea; font-weight: bold; font-size: 20px;">
              ${formatCurrency(wallet.balance)}
            </div>
            <div class="card-actions">
              <button class="card-edit" onclick="editWallet('${wallet._id}', '${wallet.name}')">Sửa</button>
              <button class="card-delete" onclick="deleteWallet('${wallet._id}')">Xóa</button>
            </div>
          </div>
        </div>
      `;
      list.appendChild(card);
    });
  } catch (error) {
    showAlert(error.message, 'error');
  }
};

// Helper function để cập nhật wallet selects
const updateWalletSelects = async () => {
  try {
    const wallets = await walletAPI.getWallets();
    if (wallets && wallets.wallets) {
      const filterWallet = document.getElementById('filterWallet');
      const transWallet = document.getElementById('transWalletId');
      
      // Xóa options cũ (trừ placeholder)
      filterWallet.innerHTML = '<option value="">Tất cả ví</option>';
      transWallet.innerHTML = '<option value="">-- Chọn ví --</option>';
      
      // Thêm ví mới
      wallets.wallets.forEach(wallet => {
        const opt1 = document.createElement('option');
        opt1.value = wallet._id;
        opt1.textContent = wallet.name;
        filterWallet.appendChild(opt1);
        
        const opt2 = document.createElement('option');
        opt2.value = wallet._id;
        opt2.textContent = wallet.name;
        transWallet.appendChild(opt2);
      });
    }
  } catch (e) {
    console.error('❌ Error updating wallet selects:', e.message);
  }
};

const createWallet = async () => {
  const name = document.getElementById('walletName').value;
  
  if (!name) {
    showAlert('Vui lòng nhập tên ví', 'error');
    return;
  }

  try {
    await walletAPI.createWallet(name);
    showAlert('Tạo ví thành công!');
    closeModal('addWalletModal');
    document.getElementById('walletName').value = ''; // Clear input
    await loadWallets();
    await loadOverview();
    await updateWalletSelects();
  } catch (error) {
    showAlert(error.message, 'error');
  }
};

const editWallet = (id, name) => {
  const newName = prompt('Nhập tên ví mới:', name);
  if (newName && newName !== name) {
    updateWallet(id, newName);
  }
};

const updateWallet = async (id, name) => {
  try {
    await walletAPI.updateWallet(id, name);
    showAlert('Cập nhật ví thành công!');
    await loadWallets();
  } catch (error) {
    showAlert(error.message, 'error');
  }
};

const deleteWallet = async (id) => {
  if (!confirm('Bạn có chắc muốn xóa ví này?')) return;

  try {
    await walletAPI.deleteWallet(id);
    showAlert('Xóa ví thành công!');
    await loadWallets();
    await loadOverview();
    await updateWalletSelects(); 
  } catch (error) {
    showAlert(error.message, 'error');
  }
};

// CATEGORIES
let allCategories = [];

const loadCategories = async () => {
  try {
    const data = await categoryAPI.getCategories();
    allCategories = data.categories;
    
    const list = document.getElementById('categoriesList');
    list.innerHTML = '';

    data.categories.forEach(category => {
      const card = document.createElement('div');
      card.className = 'card';
      const typeBadge = category.type === 'income' 
        ? '<span style="background: #51cf66; color: white; padding: 3px 8px; border-radius: 3px; font-size: 12px;">Thu nhập</span>'
        : '<span style="background: #ff6b6b; color: white; padding: 3px 8px; border-radius: 3px; font-size: 12px;">Chi tiêu</span>';
      
      card.innerHTML = `
        <div class="card-header">
          <div>
            <div class="card-title">${category.name}</div>
            <div style="font-size: 12px; color: #999;">Nhóm: ${category.group}</div>
          </div>
          <div>
            ${typeBadge}
            <div class="card-actions" style="margin-top: 10px;">
              <button class="card-edit" onclick="editCategory('${category._id}')">Sửa</button>
              <button class="card-delete" onclick="deleteCategory('${category._id}')">Xóa</button>
            </div>
          </div>
        </div>
      `;
      list.appendChild(card);
    });
  } catch (error) {
    showAlert(error.message, 'error');
  }
};

const createCategory = async () => {
  const name = document.getElementById('categoryName').value;
  const type = document.getElementById('categoryType').value;
  const group = document.getElementById('categoryGroup').value;

  if (!name || !type || !group) {
    showAlert('Vui lòng nhập đầy đủ thông tin', 'error');
    return;
  }

  try {
    await categoryAPI.createCategory(name, type, group);
    showAlert('Tạo danh mục thành công!');
    closeModal('addCategoryModal');
    await loadCategories();
  } catch (error) {
    showAlert(error.message, 'error');
  }
};

const editCategory = (id) => {
  alert('Chức năng sửa danh mục sẽ được thêm vào trong phiên bản tiếp theo');
};

const deleteCategory = async (id) => {
  if (!confirm('Bạn có chắc muốn xóa danh mục này?')) return;

  try {
    await categoryAPI.deleteCategory(id);
    showAlert('Xóa danh mục thành công!');
    await loadCategories();
  } catch (error) {
    showAlert(error.message, 'error');
  }
};

// TRANSACTIONS
let allTransactions = [];

const loadTransactions = async () => {
  try {
    const filters = {
      walletId: document.getElementById('filterWallet').value || null,
      type: document.getElementById('filterType').value || null,
      startDate: document.getElementById('filterStartDate').value || null,
      endDate: document.getElementById('filterEndDate').value || null,
      limit: 100,
    };

    const data = await transactionAPI.getTransactions(filters);
    allTransactions = data.transactions;

    const list = document.getElementById('transactionsList');
    list.innerHTML = '';

    data.transactions.forEach(trans => {
      const row = document.createElement('tr');
      const typeClass = trans.type === 'income' ? 'success' : 'error';
      const typeText = trans.type === 'income' ? 'Thu nhập' : 'Chi tiêu';
      const typeColor = trans.type === 'income' ? '#51cf66' : '#ff6b6b';
      
      row.innerHTML = `
        <td>${trans.title}</td>
        <td><span style="background: ${typeColor}; color: white; padding: 3px 8px; border-radius: 3px; font-size: 12px;">${typeText}</span></td>
        <td>${trans.category.name}</td>
        <td>${trans.wallet.name}</td>
        <td style="color: ${typeColor}; font-weight: bold;">
          ${trans.type === 'income' ? '+' : '-'} ${formatCurrency(trans.amount)}
        </td>
        <td>${formatDate(trans.date)}</td>
        <td>
          <button class="card-edit" onclick="editTransaction('${trans._id}')" style="font-size: 12px; padding: 4px 8px;">Sửa</button>
          <button class="card-delete" onclick="deleteTransaction('${trans._id}')" style="font-size: 12px; padding: 4px 8px;">Xóa</button>
        </td>
      `;
      list.appendChild(row);
    });
  } catch (error) {
    showAlert(error.message, 'error');
  }
};

const updateCategories = async () => {
  const type = document.getElementById('transType').value;
  const select = document.getElementById('transCategoryId');
  select.innerHTML = '<option value="">-- Chọn danh mục --</option>';

  const filtered = allCategories.filter(cat => cat.type === type);
  filtered.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat._id;
    option.textContent = cat.name;
    select.appendChild(option);
  });
};

const createTransaction = async () => {
  const title = document.getElementById('transTitle').value;
  const type = document.getElementById('transType').value;
  const categoryId = document.getElementById('transCategoryId').value;
  const walletId = document.getElementById('transWalletId').value;
  const amount = document.getElementById('transAmount').value;
  const date = document.getElementById('transDate').value;

  if (!title || !type || !categoryId || !walletId || !amount) {
    showAlert('Vui lòng nhập đầy đủ thông tin', 'error');
    return;
  }

  try {
    await transactionAPI.createTransaction(title, amount, type, categoryId, walletId, date);
    showAlert('Tạo giao dịch thành công!');
    closeModal('addTransactionModal');
    await loadTransactions();
    await loadOverview();
  } catch (error) {
    showAlert(error.message, 'error');
  }
};

const editTransaction = (id) => {
  alert('Chức năng sửa giao dịch sẽ được thêm vào trong phiên bản tiếp theo');
};

const deleteTransaction = async (id) => {
  if (!confirm('Bạn có chắc muốn xóa giao dịch này?')) return;

  try {
    await transactionAPI.deleteTransaction(id);
    showAlert('Xóa giao dịch thành công!');
    await loadTransactions();
    await loadOverview();
  } catch (error) {
    showAlert(error.message, 'error');
  }
};

// Logout
const handleLogout = () => {
  if (confirm('Bạn có chắc muốn đăng xuất?')) {
    removeToken();
    removeUser();
    window.location.href = '/index.html';
  }
};
