// Application State
let currentUser = null;
let currentRole = null;
let entries = [];
let loginActivity = [];
let currentHNumber = null; // Store current H number without incrementing until save

let hospitals = [
    "AKSHA HOSPITALS", "APOLLO B.G ROAD", "CUREMAX", "DR R. B. PATIL HOSPITAL", 
    "DURGA HEALTHCARE", "HIGHLAND HOSPITAL", "HOSMAT 3", "INDIANA HOSPITAL", 
    "KCTRI", "KIMS AL SHIFA", "MIO HOSPITALS", "MOTHERHOOD", "NAMMA AROGYA", 
    "NORTH WEST HOSPITAL", "PATHOGENIX", "PRIMA DIAGNOSTICS", "SARALAYA", 
    "SL. GASTRO & LIVER CLINIC", "SRI PRAAGNA", "SRI PRASHANTHI HOSPITAL", 
    "SRINIVASA HOSPITALS", "VENUS HEALTHCARE", "SIRI LABS", "GOVT MEDICAL COLLEGE", 
    "CRIYA HOSPITALS", "MANGALA HOSPITALS", "BMJH HOSPITAL", "SPARSHA DIAGNOSTICS", 
    "AGILUS DIAGNOSTICS", "HOSMAT H1", "OYSTER", "ALTOR", "HOMAT 2", 
    "FATHER MULLER HOSPITAL", "PATHOGENIX LABS", "APOLLO HOSPITAL", 
    "NANJAPPA LIFE CARE SHIVAMOGGA", "VIJAYSHREE HOSPITALS", "UNITY HOSPITAL", 
    "HAMILTON BAAILEY", "KLE", "RADON CANCER CENTRE", "MAITHRI HOSPITAL", 
    "HOSMAT 2", "SOLARIS", "APEX HOSPITALS", "RAMAIAH MCH", "HEALIUS HOSPITAL", 
    "AROSYA", "QXL", "ARION RADIOTHERAPY", "Y LABS MANGALORE", "CANVA", 
    "NEW LIFE HOSPITAL", "SURGIDERMA", "PATHCARE", "SPARSH HOSPITAL", 
    "SHANTI HOSPITAL", "ASHWINI DIAGNOSTICS", "SVM HOSPITAL"
];

let doctors = [
    "DR HARI KIRAN", "DR ADITHYA", "DR AJAY KUMAR", "DR ANIL KAMATH", 
    "DR ANITA DAND", "DR ANTHONY PIAS", "DR ARAVIND", "DR ASHWIN M", 
    "DR B J PRASAD REDDY", "DR B. R. PATIL", "DR DINESH SHET", "DR FAVAZ ALI M", 
    "DR GAURAV SHETTY", "DR GURUPRASAD BHAT", "DR HARI KIRAN REDDY", 
    "DR HEMANTH KUMAR", "DR INDUMATHY", "DR KIRAN KATTIMANI", "DR KUSHAL", 
    "DR MADHUSHREE", "DR MANOJ GOWDA", "Dr NAVANEETH KAMATH", "DR NISHITHA SHETTY", 
    "DR SAHITHYA DESIREDDY", "DR SHEELA", "DR SHIVASHANKAR BHAT", "DR SHOBITHA RAO", 
    "DR SHRAVAN R", "DR SIDDARTH S", "DR SOWDIN REDDY", "DR SUMANTH BHOOPAL", 
    "DR SURESH RAO", "DR SURYA SEN", "DR SWASTHIK", "DR SYAMALA SRIDEVI", 
    "DR T.S RAO", "DR VIJAY AGARWAL", "DR VIJITH SHETTY", "DR VISHWANATH", 
    "Dr.ASHWIN", "Dr.KRISHNA PRASAD", "Dr.MEENAKSHI JAIN", "Dr.SAMSKRTHY P MURTHY", 
    "DR MANAS", "DR ALKA C BHAT", "DR GEETHA J P", "S S RAJU", "DR LENON DISOUSA", 
    "DR ELDOY SALDANHA", "DR NEELIMA", "DR MADHURI SUMANTH", "DR ROOPESH", 
    "DR SUMAN KUMAR", "DR VAMSEEDHAR", "DR AMIT KIRAN", "DR VIKRAM MAIYA", 
    "DR DEEPU N K", "DR JALAUDDIN AKBAR", "DR MERLIN", "DR SAMSKRITI", 
    "DR SANGEETHA K", "DR GOWRI", "DR YAMINI", "DR RAVEENA", "DR LYNSEL", 
    "DR SUDHAKAR", "DR DINESH SHET", "DR SANTHOSH", "DR NAVEEN GOPAL", 
    "DR ARAVIND N", "DR NAVANEETH KAMATH", "DR HARISHA K", "DR GURUCHANNA B", 
    "DR DINESH KADAM", "DR BHAVANA SHERIGAR", "DR AADARSH", "DR ABHIJITH SHETTY", 
    "MANGESH KAMATH", "DR SHASHIDHAR", "DR SANJEEV KULGOD", "DR BHUSHAN", 
    "K MADHAVA RAO", "DR PAMPANAGOWDA", "DR MOUNA B.M", "DR CHANDRA SHEKAR", 
    "DR DINESH", "DR KRITHIKA", "DR BUSHAN", "DR ROHAN CHANDRA GATTI", 
    "DR SHREYAS N M", "DR SRIHARI", "Ninan Thomas", "DR HARISH", "DR SMITHA RAO", 
    "DR VENKATARAMANA", "DR KIRANA PAILOOR", "Y SANATH HEGDE", "Dr RANGANATH", 
    "Dr SHIVA KUMAR", "DR RAVKANTH", "DR SHYAMALA REDDY", "KALPANA SRIDHAR", 
    "DR CHANDRAKANTH", "DR MUSTAFA", "DR VIJAY KUMAR", "DR SANDHYA RAVI", 
    "DR VIDYA V BHAT", "DR NCP", "DR SUNIL KUMAR", "NITHIN", "APOORVA S", 
    "DR SHIVA PRASAD G", "DR CHANDANA PAI", "DR CHAITHRA BHAT", "DR PALLAVI", 
    "DR JEFFREY LEWIS", "DR AMAR D N"
];

// User credentials with 5 users as requested
const credentials = {
    "ANISH": { password: "HARHARMAHADEV", role: "admin", name: "Administrator" },
    "SHARAN": { password: "8892970383", role: "SHARAN", name: "User One" },
    "MANU": { password: "9947502699", role: "MANU", name: "User Two" },
    "SUDHAKAR": { password: "8309205985", role: "SUDHAKAR", name: "User Three" },
    "APARNA": { password: "7483912387", role: "APARNA", name: "Technician" }
};

let editingIndex = -1;
let addonIndex = -1;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    loadStoredData();
    initializeEventListeners();
    checkLoginStatus();
});

// Load data from localStorage
function loadStoredData() {
    const storedEntries = localStorage.getItem('phoenixEntries');
    const storedActivity = localStorage.getItem('phoenixLoginActivity');
    const storedHospitals = localStorage.getItem('phoenixHospitals');
    const storedDoctors = localStorage.getItem('phoenixDoctors');

    if (storedEntries) {
        entries = JSON.parse(storedEntries);
    }

    if (storedActivity) {
        loginActivity = JSON.parse(storedActivity);
    }

    if (storedHospitals) {
        hospitals = JSON.parse(storedHospitals);
    }

    if (storedDoctors) {
        doctors = JSON.parse(storedDoctors);
    }
}

// Save data to localStorage
function saveToStorage() {
    localStorage.setItem('phoenixEntries', JSON.stringify(entries));
    localStorage.setItem('phoenixLoginActivity', JSON.stringify(loginActivity));
    localStorage.setItem('phoenixHospitals', JSON.stringify(hospitals));
    localStorage.setItem('phoenixDoctors', JSON.stringify(doctors));
}

// Check login status
function checkLoginStatus() {
    const storedUser = sessionStorage.getItem('phoenixCurrentUser');
    const storedRole = sessionStorage.getItem('phoenixCurrentRole');
    const storedName = sessionStorage.getItem('phoenixCurrentName');

    if (storedUser && storedRole) {
        currentUser = storedUser;
        currentRole = storedRole;
        setupUserInterface(storedName);
        showPage('home');
    } else {
        showPage('login');
    }
}

// Initialize event listeners
function initializeEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);

    // Patient form
    document.getElementById('patientForm').addEventListener('submit', handlePatientSubmit);

    // Searchable dropdowns
    setupSearchableDropdown('hospitalInput', 'hospitalDropdown', hospitals);
    setupSearchableDropdown('doctorInput', 'doctorDropdown', doctors);

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.searchable-dropdown')) {
            document.querySelectorAll('.dropdown-list').forEach(list => {
                list.classList.remove('active');
            });
        }
    });

    // Load Google Sheets URL if stored
    const storedUrl = localStorage.getItem('phoenixGoogleSheetUrl');
    if (storedUrl) {
        document.getElementById('googleSheetUrl').value = storedUrl;
    }
}

// Handle login
function handleLogin(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Check credentials
    if (credentials[username] && credentials[username].password === password) {
        currentUser = username;
        currentRole = credentials[username].role;
        const currentName = credentials[username].name;

        // Store session
        sessionStorage.setItem('phoenixCurrentUser', currentUser);
        sessionStorage.setItem('phoenixCurrentRole', currentRole);
        sessionStorage.setItem('phoenixCurrentName', currentName);

        // Log activity
        loginActivity.push({
            username: currentUser,
            name: currentName,
            role: currentRole,
            timestamp: new Date().toLocaleString(),
            status: 'online'
        });
        saveToStorage();

        setupUserInterface(currentName);
        showPage('home');

        // Reset form
        document.getElementById('loginForm').reset();

        // Show success message
        setTimeout(() => {
            alert(`Welcome to Phoenix Oncopathology, ${currentName}!`);
        }, 100);
    } else {
        alert('Invalid credentials. Please check username and password.');
    }
}

// Setup user interface based on role
function setupUserInterface(userName) {
    document.body.className = currentRole;
    document.getElementById('navbar').classList.remove('hidden');

    // Update user info in navbar
    document.getElementById('currentUserName').textContent = userName;
    document.getElementById('currentUserRole').textContent = currentRole.toUpperCase();

    // Initialize home page
    generateHNumber();
    setTodayDate();

    // Update admin stats
    updateAdminStats();
    loadLoginActivity();
}

// Generate H number (but don't increment counter until save)
function generateHNumber() {
    const currentYear = new Date().getFullYear();
    let counter = parseInt(localStorage.getItem('phoenixHNumberCounter') || '0999');
    const nextNumber = counter + 1;

    currentHNumber = `H-${nextNumber.toString().padStart(4, '0')}/${currentYear}`;
    document.getElementById('hNumber').value = currentHNumber;
}

// Set today's date
function setTodayDate() {
    const today = new Date().toLocaleDateString('en-GB');
    document.getElementById('entryDate').value = today;
}

// Setup searchable dropdown
function setupSearchableDropdown(inputId, dropdownId, dataArray) {
    const input = document.getElementById(inputId);
    const dropdown = document.getElementById(dropdownId);

    input.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filteredData = dataArray.filter(item => 
            item.toLowerCase().includes(searchTerm)
        );

        showDropdownItems(dropdown, filteredData, input);
    });

    input.addEventListener('focus', function() {
        showDropdownItems(dropdown, dataArray, input);
    });
}

// Show dropdown items
function showDropdownItems(dropdown, items, input) {
    dropdown.innerHTML = '';

    items.slice(0, 10).forEach(item => {
        const div = document.createElement('div');
        div.className = 'dropdown-item';
        div.textContent = item;
        div.addEventListener('click', () => {
            input.value = item;
            dropdown.classList.remove('active');
        });
        dropdown.appendChild(div);
    });

    dropdown.classList.add('active');
}

// Add new hospital
function addNewHospital() {
    const name = prompt('Enter new hospital name:');
    if (name && name.trim()) {
        const newHospital = name.trim().toUpperCase();
        if (!hospitals.includes(newHospital)) {
            hospitals.push(newHospital);
            hospitals.sort();
            saveToStorage();
            document.getElementById('hospitalInput').value = newHospital;
            alert('Hospital added successfully!');
        } else {
            alert('Hospital already exists!');
        }
    }
}

// Add new doctor
function addNewDoctor() {
    const name = prompt('Enter new doctor name:');
    if (name && name.trim()) {
        const newDoctor = name.trim().toUpperCase();
        if (!doctors.includes(newDoctor)) {
            doctors.push(newDoctor);
            doctors.sort();
            saveToStorage();
            document.getElementById('doctorInput').value = newDoctor;
            alert('Doctor added successfully!');
        } else {
            alert('Doctor already exists!');
        }
    }
}

// Handle patient form submission
async function handlePatientSubmit(e) {
    e.preventDefault();

    const googleSheetUrl = document.getElementById('googleSheetUrl').value.trim();

    const formData = {
        date: document.getElementById('entryDate').value,
        hNumber: currentHNumber,
        patientName: document.getElementById('patientName').value.trim(),
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        hospital: document.getElementById('hospitalInput').value.trim(),
        doctor: document.getElementById('doctorInput').value.trim(),
        information: document.getElementById('information').value.trim(),
        containers: document.getElementById('containers').value,
        test: document.getElementById('testType').value,
        username: currentUser,
        timestamp: new Date().toISOString()
    };

    // Validate form
    if (!formData.patientName || !formData.hospital || !formData.doctor || !formData.age || !formData.gender || !formData.containers || !formData.test) {
        alert('Please fill in all required fields.');
        return;
    }

    try {
        // Try to save to Google Sheets if URL is provided and not placeholder
        if (googleSheetUrl && googleSheetUrl !== 'https://script.google.com/macros/s/AKfycbyNVmmNps7Za1mAMNckDq00TW4IGwsX88cOweYO0XFk8Y2OwkCDyWVE2_wECjC3lzY/exec') {
            await saveToGoogleSheets(formData, googleSheetUrl);
            localStorage.setItem('phoenixGoogleSheetUrl', googleSheetUrl);
        }

        // Save locally
        entries.push(formData);

        // NOW increment the H number counter only after successful save
        let counter = parseInt(localStorage.getItem('phoenixHNumberCounter') || '0');
        counter++;
        localStorage.setItem('phoenixHNumberCounter', counter);

        saveToStorage();

        alert(`Entry saved successfully!\nH Number: ${formData.hNumber}\nPatient: ${formData.patientName}`);
        resetForm();
        generateHNumber(); // Generate next H number for display

    } catch (error) {
        console.error('Error saving to Google Sheets:', error);

        // Still save locally even if Google Sheets fails
        entries.push(formData);

        // Increment counter since we saved locally
        let counter = parseInt(localStorage.getItem('phoenixHNumberCounter') || '0');
        counter++;
        localStorage.setItem('phoenixHNumberCounter', counter);

        saveToStorage();

        alert(`Entry saved locally!\nH Number: ${formData.hNumber}\nNote: Google Sheets sync may have failed.`);
        resetForm();
        generateHNumber();
    }
}

// Save to Google Sheets - CORRECTED to match your Apps Script format
async function saveToGoogleSheets(data, url) {
    const payload = {
        entry: {
            date: data.date,
            hNumber: data.hNumber,
            patientName: data.patientName,
            age: data.age,
            hospital: data.hospital,
            doctor: data.doctor,
            info: data.information,
            containers: data.containers,
            testName: data.test
        }
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        mode: 'no-cors'
    });

    return response;
}

// Reset form
function resetForm() {
    document.getElementById('patientForm').reset();
    setTodayDate();
    document.getElementById('hNumber').value = currentHNumber; // Keep the current H number

    // Reset Google Sheets URL for admin
    if (currentRole === 'admin') {
        const storedUrl = localStorage.getItem('phoenixGoogleSheetUrl');
        document.getElementById('googleSheetUrl').value = storedUrl || 'https://script.google.com/macros/s/AKfycbyNVmmNps7Za1mAMNckDq00TW4IGwsX88cOweYO0XFk8Y2OwkCDyWVE2_wECjC3lzY/exec';
    }
}

// Show page
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    document.getElementById(pageId + 'Page').classList.add('active');

    // Load page-specific data
    if (pageId === 'search') {
        loadSearchPage();
    } else if (pageId === 'admin') {
        loadAdminPage();
    } else if (pageId === 'logs') {
        loadLogsPage();
    } else if (pageId === 'login') {
        document.getElementById('navbar').classList.add('hidden');
    }
}

// Load search page
function loadSearchPage() {
    displayEntries(entries);
}

// Display entries in table
function displayEntries(entriesToShow) {
    const tbody = document.getElementById('entriesTableBody');
    tbody.innerHTML = '';

    entriesToShow.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.hNumber}</td>
            <td>${entry.date}</td>
            <td>${entry.patientName}</td>
            <td>${entry.age}</td>
            <td>${entry.gender}</td>
            <td>${entry.hospital}</td>
            <td>${entry.doctor}</td>
            <td>${entry.test}</td>
            <td>${entry.username}</td>
            <td>
                <button class="action-btn action-btn--edit" onclick="editEntry(${index})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                ${currentRole === 'admin' ? `
                    <button class="action-btn action-btn--addon" onclick="addonEntry(${index})">
                        <i class="fas fa-plus"></i> Add-on
                    </button>
                    <button class="action-btn action-btn--delete" onclick="deleteEntry(${index})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                ` : ''}
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Search entries
function searchEntries() {
    const patientName = document.getElementById('searchPatientName').value.toLowerCase();
    const hNumber = document.getElementById('searchHNumber').value.toLowerCase();

    let filteredEntries = entries.filter(entry => {
        let matches = true;

        if (patientName && !entry.patientName.toLowerCase().includes(patientName)) {
            matches = false;
        }

        if (hNumber && !entry.hNumber.toLowerCase().includes(hNumber)) {
            matches = false;
        }

        // Admin-only search fields
        if (currentRole === 'admin') {
            const hospital = document.getElementById('searchHospital').value.toLowerCase();
            const test = document.getElementById('searchTest').value.toLowerCase();
            const date = document.getElementById('searchDate').value;

            if (hospital && !entry.hospital.toLowerCase().includes(hospital)) {
                matches = false;
            }

            if (test && !entry.test.toLowerCase().includes(test)) {
                matches = false;
            }

            if (date && entry.date !== new Date(date).toLocaleDateString('en-GB')) {
                matches = false;
            }
        }

        return matches;
    });

    displayEntries(filteredEntries);
}

// Clear search
function clearSearch() {
    document.getElementById('searchPatientName').value = '';
    document.getElementById('searchHNumber').value = '';
    if (currentRole === 'admin') {
        document.getElementById('searchHospital').value = '';
        document.getElementById('searchTest').value = '';
        document.getElementById('searchDate').value = '';
    }
    displayEntries(entries);
}

// Edit entry
function editEntry(index) {
    editingIndex = index;
    const entry = entries[index];

    const modalBody = document.querySelector('#editModal .modal-body');
    modalBody.innerHTML = `
        <div class="form-group">
            <label class="form-label">Patient Name</label>
            <input type="text" id="editPatientName" class="form-control" value="${entry.patientName}">
        </div>
        <div class="form-group">
            <label class="form-label">Age</label>
            <input type="number" id="editAge" class="form-control" value="${entry.age}">
        </div>
        <div class="form-group">
            <label class="form-label">Gender</label>
            <select id="editGender" class="form-control">
                <option value="Male" ${entry.gender === 'Male' ? 'selected' : ''}>Male</option>
                <option value="Female" ${entry.gender === 'Female' ? 'selected' : ''}>Female</option>
                <option value="Other" ${entry.gender === 'Other' ? 'selected' : ''}>Other</option>
            </select>
        </div>
        <div class="form-group">
            <label class="form-label">Hospital</label>
            <input type="text" id="editHospital" class="form-control" value="${entry.hospital}">
        </div>
        <div class="form-group">
            <label class="form-label">Doctor</label>
            <input type="text" id="editDoctor" class="form-control" value="${entry.doctor}">
        </div>
        <div class="form-group">
            <label class="form-label">Information</label>
            <textarea id="editInformation" class="form-control" rows="3">${entry.information}</textarea>
        </div>
        <div class="form-group">
            <label class="form-label">Containers</label>
            <input type="number" id="editContainers" class="form-control" value="${entry.containers}">
        </div>
        <div class="form-group">
            <label class="form-label">Test</label>
            <select id="editTest" class="form-control">
                <option value="SMALL" ${entry.test === 'SMALL' ? 'selected' : ''}>SMALL</option>
                <option value="MEDIUM" ${entry.test === 'MEDIUM' ? 'selected' : ''}>MEDIUM</option>
                <option value="LARGE" ${entry.test === 'LARGE' ? 'selected' : ''}>LARGE</option>
                <option value="EXTRA LARGE" ${entry.test === 'EXTRA LARGE' ? 'selected' : ''}>EXTRA LARGE</option>
                <option value="IHC" ${entry.test === 'IHC' ? 'selected' : ''}>IHC</option>
                <option value="EXPERT OPINION" ${entry.test === 'EXPERT OPINION' ? 'selected' : ''}>EXPERT OPINION</option>
                <option value="MSI" ${entry.test === 'MSI' ? 'selected' : ''}>MSI</option>
                <option value="BLANK" ${entry.test === 'BLANK' ? 'selected' : ''}>BLANK</option>
            </select>
        </div>
    `;

    document.getElementById('editModal').classList.remove('hidden');
}

// Save edit
function saveEdit() {
    if (editingIndex >= 0) {
        entries[editingIndex] = {
            ...entries[editingIndex],
            patientName: document.getElementById('editPatientName').value,
            age: document.getElementById('editAge').value,
            gender: document.getElementById('editGender').value,
            hospital: document.getElementById('editHospital').value,
            doctor: document.getElementById('editDoctor').value,
            information: document.getElementById('editInformation').value,
            containers: document.getElementById('editContainers').value,
            test: document.getElementById('editTest').value
        };

        saveToStorage();
        displayEntries(entries);
        closeEditModal();
        alert('Entry updated successfully!');
    }
}

// Close edit modal
function closeEditModal() {
    document.getElementById('editModal').classList.add('hidden');
    editingIndex = -1;
}

// Add-on entry
function addonEntry(index) {
    addonIndex = index;
    document.getElementById('addonModal').classList.remove('hidden');
}

// Save addon
function saveAddon() {
    if (addonIndex >= 0) {
        const additionalTest = document.getElementById('additionalTest').value;
        if (additionalTest) {
            const originalEntry = entries[addonIndex];
            const newTest = originalEntry.test + ', ' + additionalTest;

            entries[addonIndex].test = newTest;
            saveToStorage();
            displayEntries(entries);
            closeAddonModal();
            alert('Test added successfully!');
        }
    }
}

// Close addon modal
function closeAddonModal() {
    document.getElementById('addonModal').classList.add('hidden');
    document.getElementById('additionalTest').value = '';
    addonIndex = -1;
}

// Delete entry
function deleteEntry(index) {
    if (confirm('Are you sure you want to delete this entry? This action cannot be undone.')) {
        entries.splice(index, 1);
        saveToStorage();
        displayEntries(entries);
        alert('Entry deleted successfully!');
    }
}

// Export to CSV
function exportToCSV() {
    if (entries.length === 0) {
        alert('No data to export');
        return;
    }

    const headers = ['H Number', 'Date', 'Patient Name', 'Age', 'Gender', 'Hospital', 'Doctor', 'Information', 'Containers', 'Test', 'Username'];
    const csvContent = [
        headers.join(','),
        ...entries.map(entry => [
            entry.hNumber, 
            entry.date,
            `"${entry.patientName}"`,
            entry.age,
            entry.gender,
            `"${entry.hospital}"`,
            `"${entry.doctor}"`,
            `"${entry.information.replace(/"/g, '""')}"`,
            entry.containers,
            `"${entry.test}"`,
            entry.username
        ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `phoenix_oncopathology_entries_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Load admin page
function loadAdminPage() {
    if (currentRole !== 'admin') {
        alert('Access denied. Admin privileges required.');
        showPage('home');
        return;
    }
    updateAdminStats();
}

// Load logs page
function loadLogsPage() {
    if (currentRole !== 'admin') {
        alert('Access denied. Admin privileges required.');
        showPage('home');
        return;
    }
    loadLoginActivity();
}

// Update admin stats
function updateAdminStats() {
    document.getElementById('totalEntries').textContent = entries.length;
    document.getElementById('totalLogins').textContent = loginActivity.length;
}

// Load login activity
function loadLoginActivity() {
    const tbody = document.getElementById('loginActivityTable');
    tbody.innerHTML = '';

    loginActivity.slice().reverse().forEach(activity => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${activity.username}</td>
            <td>${activity.name}</td>
            <td><span class="status ${activity.role === 'admin' ? 'status--admin' : 'status--info'}">${activity.role.toUpperCase()}</span></td>
            <td>${activity.timestamp}</td>
            <td><span class="status status--online">LOGGED IN</span></td>
        `;
        tbody.appendChild(row);
    });
}

// Admin Controls
function resetHNumberCounter() {
    if (confirm('Are you sure you want to reset the H Number counter? This will start numbering from H-0001/YYYY again.')) {
        localStorage.setItem('phoenixHNumberCounter', '0');
        generateHNumber();
        alert('H Number counter has been reset successfully!');
    }
}

function exportAllData() {
    const data = {
        entries: entries,
        loginActivity: loginActivity,
        hospitals: hospitals,
        doctors: doctors,
        exportDate: new Date().toISOString(),
        totalEntries: entries.length,
        totalLogins: loginActivity.length
    };

    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `phoenix_oncopathology_complete_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
}

function clearAllLogs() {
    if (confirm('Are you sure you want to clear all login logs? This action cannot be undone.')) {
        loginActivity = [];
        saveToStorage();
        loadLoginActivity();
        updateAdminStats();
        alert('All login logs have been cleared!');
    }
}

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear session
        sessionStorage.removeItem('phoenixCurrentUser');
        sessionStorage.removeItem('phoenixCurrentRole');
        sessionStorage.removeItem('phoenixCurrentName');

        currentUser = null;
        currentRole = null;
        currentHNumber = null;

        showPage('login');
        document.body.className = '';

        alert('You have been logged out successfully.');
    }
}
