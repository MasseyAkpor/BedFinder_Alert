// script.js - Complete Application

// Application State
const AppState = {
    hospitals: [],
    userLocation: null,
    currentUser: null,
    map: null,
    markers: [],
    filters: {
        region: 'all',
        bedType: 'all',
        search: ''
    },
    isLoading: false
};

// Hospital Data for all 16 regions of Ghana
const GHANA_HOSPITALS = [
    // Greater Accra Region
    {
        id: 1,
        name: "Korle-Bu Teaching Hospital",
        region: "Greater Accra",
        district: "Accra Metro",
        address: "Guggisberg Ave, Accra",
        phone: "+233302665651",
        icu: 15,
        ventilator: 10,
        oxygen: 25,
        general: 50,
        lat: 5.5391,
        lng: -0.2265,
        specialties: ["Trauma", "Cardiology", "Neurology", "ICU"],
        waitingTime: 20,
        capacity: 100,
        occupied: 35,
        staffLogin: { hospitalId: "KBTH001", staffId: "admin", password: "password123" }
    },
    {
        id: 2,
        name: "Ridge Hospital",
        region: "Greater Accra",
        district: "Accra Metro",
        address: "Kanda Highway, Accra",
        phone: "+233302665233",
        icu: 8,
        ventilator: 6,
        oxygen: 15,
        general: 30,
        lat: 5.5684,
        lng: -0.2031,
        specialties: ["Emergency", "Maternity", "General"],
        waitingTime: 30,
        capacity: 60,
        occupied: 22,
        staffLogin: { hospitalId: "RIDGE002", staffId: "admin", password: "password123" }
    },
    // Ashanti Region
    {
        id: 3,
        name: "Komfo Anokye Teaching Hospital",
        region: "Ashanti",
        district: "Kumasi Metro",
        address: "Bantama, Kumasi",
        phone: "+233322066325",
        icu: 12,
        ventilator: 8,
        oxygen: 20,
        general: 40,
        lat: 6.6948,
        lng: -1.6244,
        specialties: ["Pediatrics", "Oncology", "Surgery", "ICU"],
        waitingTime: 25,
        capacity: 80,
        occupied: 28,
        staffLogin: { hospitalId: "KATH003", staffId: "admin", password: "password123" }
    },
    // Northern Region
    {
        id: 4,
        name: "Tamale Teaching Hospital",
        region: "Northern",
        district: "Tamale Metro",
        address: "Tamale-Kumasi Road",
        phone: "+233372022295",
        icu: 6,
        ventilator: 4,
        oxygen: 12,
        general: 25,
        lat: 9.3963,
        lng: -0.8396,
        specialties: ["Infectious Diseases", "Surgery", "Pediatrics"],
        waitingTime: 35,
        capacity: 50,
        occupied: 18,
        staffLogin: { hospitalId: "TTH004", staffId: "admin", password: "password123" }
    },
    // Western Region
    {
        id: 5,
        name: "Effia Nkwanta Regional Hospital",
        region: "Western",
        district: "Sekondi-Takoradi",
        address: "Takoradi",
        phone: "+233312022600",
        icu: 5,
        ventilator: 3,
        oxygen: 10,
        general: 20,
        lat: 4.9431,
        lng: -1.7044,
        specialties: ["General Medicine", "Surgery", "Pediatrics"],
        waitingTime: 40,
        capacity: 40,
        occupied: 15,
        staffLogin: { hospitalId: "ENRH005", staffId: "admin", password: "password123" }
    },
    // Eastern Region
    {
        id: 6,
        name: "Koforidua Regional Hospital",
        region: "Eastern",
        district: "Koforidua",
        address: "Koforidua",
        phone: "+233342022311",
        icu: 4,
        ventilator: 2,
        oxygen: 8,
        general: 15,
        lat: 6.0961,
        lng: -0.2592,
        specialties: ["General Medicine", "Maternity", "Pediatrics"],
        waitingTime: 45,
        capacity: 30,
        occupied: 12,
        staffLogin: { hospitalId: "KRH006", staffId: "admin", password: "password123" }
    },
    // Central Region
    {
        id: 7,
        name: "Cape Coast Teaching Hospital",
        region: "Central",
        district: "Cape Coast",
        address: "Cape Coast",
        phone: "+233332132187",
        icu: 7,
        ventilator: 5,
        oxygen: 12,
        general: 25,
        lat: 5.1315,
        lng: -1.2795,
        specialties: ["Internal Medicine", "Surgery", "Maternity"],
        waitingTime: 30,
        capacity: 50,
        occupied: 20,
        staffLogin: { hospitalId: "CCTH007", staffId: "admin", password: "password123" }
    },
    // Volta Region
    {
        id: 8,
        name: "Ho Teaching Hospital",
        region: "Volta",
        district: "Ho Municipal",
        address: "Ho",
        phone: "+233362022490",
        icu: 3,
        ventilator: 2,
        oxygen: 6,
        general: 12,
        lat: 6.6111,
        lng: 0.4714,
        specialties: ["General Medicine", "Surgery", "Pediatrics"],
        waitingTime: 50,
        capacity: 25,
        occupied: 10,
        staffLogin: { hospitalId: "HTH008", staffId: "admin", password: "password123" }
    },
    // Upper East Region
    {
        id: 9,
        name: "Bolgatanga Regional Hospital",
        region: "Upper East",
        district: "Bolgatanga",
        address: "Bolgatanga",
        phone: "+233382022200",
        icu: 2,
        ventilator: 1,
        oxygen: 4,
        general: 10,
        lat: 10.7856,
        lng: -0.8514,
        specialties: ["General Medicine", "Maternity", "Emergency"],
        waitingTime: 55,
        capacity: 20,
        occupied: 8,
        staffLogin: { hospitalId: "BRH009", staffId: "admin", password: "password123" }
    },
    // Upper West Region
    {
        id: 10,
        name: "Wa Regional Hospital",
        region: "Upper West",
        district: "Wa Municipal",
        address: "Wa",
        phone: "+233392022311",
        icu: 2,
        ventilator: 1,
        oxygen: 4,
        general: 10,
        lat: 10.0601,
        lng: -2.5099,
        specialties: ["General Medicine", "Maternity", "Emergency"],
        waitingTime: 60,
        capacity: 20,
        occupied: 7,
        staffLogin: { hospitalId: "WRH010", staffId: "admin", password: "password123" }
    },
    // Bono Region
    {
        id: 11,
        name: "Sunyani Regional Hospital",
        region: "Bono",
        district: "Sunyani",
        address: "Sunyani",
        phone: "+233352022411",
        icu: 4,
        ventilator: 2,
        oxygen: 8,
        general: 15,
        lat: 7.3359,
        lng: -2.3317,
        specialties: ["General Medicine", "Surgery", "Pediatrics"],
        waitingTime: 40,
        capacity: 30,
        occupied: 12,
        staffLogin: { hospitalId: "SRH011", staffId: "admin", password: "password123" }
    },
    // Ahafo Region
    {
        id: 12,
        name: "Goaso Government Hospital",
        region: "Ahafo",
        district: "Asunafo North",
        address: "Goaso",
        phone: "+233352022512",
        icu: 2,
        ventilator: 1,
        oxygen: 4,
        general: 8,
        lat: 6.8036,
        lng: -2.5128,
        specialties: ["General Medicine", "Maternity", "Emergency"],
        waitingTime: 50,
        capacity: 15,
        occupied: 6,
        staffLogin: { hospitalId: "GGH012", staffId: "admin", password: "password123" }
    },
    // Bono East Region
    {
        id: 13,
        name: "Techiman Holy Family Hospital",
        region: "Bono East",
        district: "Techiman",
        address: "Techiman",
        phone: "+233352022613",
        icu: 3,
        ventilator: 2,
        oxygen: 6,
        general: 12,
        lat: 7.5866,
        lng: -1.9415,
        specialties: ["General Medicine", "Maternity", "Surgery"],
        waitingTime: 45,
        capacity: 25,
        occupied: 9,
        staffLogin: { hospitalId: "HFH013", staffId: "admin", password: "password123" }
    },
    // Oti Region
    {
        id: 14,
        name: "Dambai Health Center",
        region: "Oti",
        district: "Krachi East",
        address: "Dambai",
        phone: "+233362022714",
        icu: 1,
        ventilator: 0,
        oxygen: 2,
        general: 6,
        lat: 8.0667,
        lng: 0.1833,
        specialties: ["General Medicine", "Emergency"],
        waitingTime: 65,
        capacity: 10,
        occupied: 4,
        staffLogin: { hospitalId: "DHC014", staffId: "admin", password: "password123" }
    },
    // Savannah Region
    {
        id: 15,
        name: "Damongo Hospital",
        region: "Savannah",
        district: "West Gonja",
        address: "Damongo",
        phone: "+233382022815",
        icu: 1,
        ventilator: 0,
        oxygen: 2,
        general: 6,
        lat: 9.0833,
        lng: -1.8167,
        specialties: ["General Medicine", "Maternity", "Emergency"],
        waitingTime: 70,
        capacity: 10,
        occupied: 3,
        staffLogin: { hospitalId: "DH015", staffId: "admin", password: "password123" }
    },
    // North East Region
    {
        id: 16,
        name: "Nalerigu Baptist Medical Centre",
        region: "North East",
        district: "East Mamprusi",
        address: "Nalerigu",
        phone: "+233392022916",
        icu: 2,
        ventilator: 1,
        oxygen: 4,
        general: 8,
        lat: 10.5333,
        lng: -0.3667,
        specialties: ["General Medicine", "Surgery", "Pediatrics"],
        waitingTime: 60,
        capacity: 15,
        occupied: 5,
        staffLogin: { hospitalId: "BMC016", staffId: "admin", password: "password123" }
    },
    // Western North Region
    {
        id: 17,
        name: "Sefwi Wiawso Government Hospital",
        region: "Western North",
        district: "Wiawso",
        address: "Sefwi Wiawso",
        phone: "+233312023017",
        icu: 2,
        ventilator: 1,
        oxygen: 4,
        general: 8,
        lat: 6.2167,
        lng: -2.4833,
        specialties: ["General Medicine", "Maternity", "Emergency"],
        waitingTime: 55,
        capacity: 15,
        occupied: 6,
        staffLogin: { hospitalId: "SGH017", staffId: "admin", password: "password123" }
    }
];

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    console.log('BedFinder Pro Initializing...');
    
    // Initialize hospitals
    AppState.hospitals = [...GHANA_HOSPITALS];
    
    // Initialize UI
    initializeUI();
    
    // Load initial data
    loadInitialData();
    
    // Update live status
    updateLiveStatus();
    
    // Set up periodic updates
    setInterval(updateLiveStatus, 30000); // Every 30 seconds
});

// Initialize UI Components
function initializeUI() {
    console.log('Initializing UI components...');
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Find Bed buttons
    const findBedButtons = document.querySelectorAll('.find-bed-btn');
    findBedButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeAllModals();
            openPatientPortal();
        });
    });
    
    // Staff Login buttons
    const staffLoginButtons = document.querySelectorAll('.staff-login-btn');
    staffLoginButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeAllModals();
            openStaffLogin();
        });
    });
    
    // Emergency button
    const emergencyBtn = document.querySelector('.emergency-btn');
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', () => {
            window.location.href = 'tel:112';
        });
    }
    
    // Modal close buttons
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', closeAllModals);
    });
    
    // Region cards click
    const regionCards = document.querySelectorAll('.region-card');
    regionCards.forEach(card => {
        card.addEventListener('click', () => {
            const region = card.dataset.region;
            openPatientPortal();
            setTimeout(() => {
                document.getElementById('region-select').value = region;
                filterHospitals();
            }, 100);
        });
    });
    
    // Apply filters button
    const applyFiltersBtn = document.getElementById('apply-filters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', filterHospitals);
    }
    
    // Use location button
    const useLocationBtn = document.getElementById('use-location');
    if (useLocationBtn) {
        useLocationBtn.addEventListener('click', useCurrentLocation);
    }
    
    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Logout button
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Map controls
    const refreshMapBtn = document.getElementById('refresh-map');
    const centerMapBtn = document.getElementById('center-map');
    
    if (refreshMapBtn) {
        refreshMapBtn.addEventListener('click', () => {
            if (AppState.map) {
                AppState.map.invalidateSize();
                showToast('Map refreshed', 'success');
            }
        });
    }
    
    if (centerMapBtn) {
        centerMapBtn.addEventListener('click', () => {
            if (AppState.map && AppState.currentUser) {
                const hospital = AppState.hospitals.find(h => h.id === AppState.currentUser.hospitalId);
                if (hospital) {
                    AppState.map.setView([hospital.lat, hospital.lng], 13);
                }
            }
        });
    }
    
    // Save changes button
    const saveChangesBtn = document.getElementById('save-changes');
    if (saveChangesBtn) {
        saveChangesBtn.addEventListener('click', saveHospitalChanges);
    }
    
    // Bed counter buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('counter-btn')) {
            const type = e.target.dataset.type;
            const change = parseInt(e.target.dataset.change);
            updateBedCount(type, change);
        }
    });
    
    // Close modals when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
}

// Load Initial Data
function loadInitialData() {
    console.log('Loading initial data...');
    
    // Calculate total stats
    const totalBeds = AppState.hospitals.reduce((sum, h) => 
        sum + h.icu + h.ventilator + h.oxygen + h.general, 0);
    
    const availableBeds = AppState.hospitals.reduce((sum, h) => 
        sum + h.icu + h.ventilator + h.oxygen, 0);
    
    // Update stats display
    document.getElementById('total-beds').textContent = availableBeds;
    document.getElementById('total-hospitals').textContent = AppState.hospitals.length;
    
    // Update region stats
    updateRegionStats();
    
    console.log('Initial data loaded');
}

// Update Live Status
function updateLiveStatus() {
    const availableBeds = AppState.hospitals.reduce((sum, h) => 
        sum + h.icu + h.ventilator + h.oxygen, 0);
    
    const regionsWithBeds = [...new Set(AppState.hospitals
        .filter(h => h.icu + h.ventilator + h.oxygen > 0)
        .map(h => h.region))];
    
    const statusText = `Live: ${availableBeds} beds available across ${regionsWithBeds.length} regions`;
    
    const statusElement = document.getElementById('live-status');
    if (statusElement) {
        statusElement.textContent = statusText;
    }
}

// Update Region Stats
function updateRegionStats() {
    const regionStats = {};
    
    AppState.hospitals.forEach(hospital => {
        if (!regionStats[hospital.region]) {
            regionStats[hospital.region] = {
                hospitals: 0,
                beds: 0
            };
        }
        regionStats[hospital.region].hospitals++;
        regionStats[hospital.region].beds += hospital.icu + hospital.ventilator + hospital.oxygen;
    });
    
    // Update region cards
    const regionCards = document.querySelectorAll('.region-card');
    regionCards.forEach(card => {
        const region = card.dataset.region;
        const stats = regionStats[region] || { hospitals: 0, beds: 0 };
        
        const hospitalSpan = card.querySelector('.region-stats span:nth-child(1)');
        const bedsSpan = card.querySelector('.region-stats span:nth-child(2)');
        
        if (hospitalSpan) {
            hospitalSpan.innerHTML = `<i class="fas fa-hospital"></i> ${stats.hospitals} Hospitals`;
        }
        
        if (bedsSpan) {
            bedsSpan.innerHTML = `<i class="fas fa-bed"></i> ${stats.beds} Beds`;
        }
    });
}

// Modal Management
function openPatientPortal() {
    console.log('Opening patient portal...');
    
    const modal = document.getElementById('patient-portal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Load hospitals
        filterHospitals();
    }
}

function openStaffLogin() {
    console.log('Opening staff login...');
    
    const modal = document.getElementById('staff-login-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function openStaffDashboard(hospital) {
    console.log('Opening staff dashboard for:', hospital.name);
    
    AppState.currentUser = {
        hospitalId: hospital.id,
        hospitalName: hospital.name
    };
    
    const modal = document.getElementById('staff-dashboard');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Update dashboard header
        document.getElementById('current-hospital').textContent = hospital.name;
        
        // Initialize dashboard
        initializeDashboard(hospital);
    }
}

function closeAllModals() {
    console.log('Closing all modals...');
    
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
    
    document.body.style.overflow = 'auto';
}

// Hospital Filtering
function filterHospitals() {
    console.log('Filtering hospitals...');
    
    const regionSelect = document.getElementById('region-select');
    const bedTypeSelect = document.getElementById('bed-type');
    const searchInput = document.getElementById('hospital-search');
    
    if (!regionSelect || !bedTypeSelect || !searchInput) return;
    
    AppState.filters = {
        region: regionSelect.value,
        bedType: bedTypeSelect.value,
        search: searchInput.value.toLowerCase()
    };
    
    let filteredHospitals = [...AppState.hospitals];
    
    // Filter by region
    if (AppState.filters.region !== 'all') {
        filteredHospitals = filteredHospitals.filter(h => 
            h.region === AppState.filters.region
        );
    }
    
    // Filter by bed type
    if (AppState.filters.bedType !== 'all') {
        filteredHospitals = filteredHospitals.filter(h => {
            const bedCount = h[AppState.filters.bedType];
            return bedCount > 0;
        });
    }
    
    // Filter by search
    if (AppState.filters.search) {
        filteredHospitals = filteredHospitals.filter(h => 
            h.name.toLowerCase().includes(AppState.filters.search) ||
            h.district.toLowerCase().includes(AppState.filters.search)
        );
    }
    
    // Render filtered hospitals
    renderHospitals(filteredHospitals);
}

// Render Hospitals
function renderHospitals(hospitals) {
    console.log('Rendering hospitals:', hospitals.length);
    
    const grid = document.getElementById('hospitals-grid');
    const resultsCount = document.getElementById('results-count');
    
    if (!grid || !resultsCount) return;
    
    if (hospitals.length === 0) {
        grid.innerHTML = `
            <div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <i class="fas fa-hospital" style="font-size: 3rem; color: #94a3b8; margin-bottom: 1rem;"></i>
                <h3 style="color: #f8fafc; margin-bottom: 0.5rem;">No hospitals found</h3>
                <p style="color: #94a3b8;">Try adjusting your filters or search criteria</p>
            </div>
        `;
        resultsCount.textContent = "No hospitals found";
        return;
    }
    
    resultsCount.textContent = `${hospitals.length} hospitals found`;
    
    grid.innerHTML = hospitals.map(hospital => {
        const totalCriticalBeds = hospital.icu + hospital.ventilator + hospital.oxygen;
        
        let availabilityClass = 'available';
        let availabilityText = 'Available';
        
        if (totalCriticalBeds === 0) {
            availabilityClass = 'full';
            availabilityText = 'Full';
        } else if (totalCriticalBeds < 5) {
            availabilityClass = 'limited';
            availabilityText = 'Limited';
        }
        
        return `
            <div class="hospital-card">
                <div class="hospital-header">
                    <div>
                        <div class="hospital-name">${hospital.name}</div>
                        <div class="hospital-region">
                            <i class="fas fa-map-marker-alt"></i>
                            ${hospital.district}, ${hospital.region}
                        </div>
                    </div>
                    <div class="availability-badge ${availabilityClass}">
                        ${availabilityText}
                    </div>
                </div>
                
                <div class="hospital-beds">
                    <div class="bed-item">
                        <span><i class="fas fa-procedures"></i> ICU Beds</span>
                        <span class="bed-count">${hospital.icu} available</span>
                    </div>
                    <div class="bed-item">
                        <span><i class="fas fa-wind"></i> Ventilators</span>
                        <span class="bed-count">${hospital.ventilator} available</span>
                    </div>
                    <div class="bed-item">
                        <span><i class="fas fa-lungs"></i> Oxygen Beds</span>
                        <span class="bed-count">${hospital.oxygen} available</span>
                    </div>
                    <div class="bed-item">
                        <span><i class="fas fa-bed"></i> General Beds</span>
                        <span class="bed-count">${hospital.general} available</span>
                    </div>
                </div>
                
                <div class="hospital-specialties" style="margin: 1rem 0;">
                    ${hospital.specialties.map(spec => 
                        `<span style="background: rgba(59, 130, 246, 0.1); color: #60a5fa; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.75rem; margin-right: 0.5rem; margin-bottom: 0.5rem; display: inline-block;">${spec}</span>`
                    ).join('')}
                </div>
                
                <div class="hospital-actions">
                    <button class="action-btn call" onclick="callHospital('${hospital.phone}')">
                        <i class="fas fa-phone"></i> Call
                    </button>
                    <button class="action-btn directions" onclick="getDirections(${hospital.id})">
                        <i class="fas fa-directions"></i> Directions
                    </button>
                    <button class="action-btn reserve" onclick="reserveBed(${hospital.id})">
                        <i class="fas fa-bed"></i> Reserve
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Geolocation
function useCurrentLocation() {
    console.log('Getting current location...');
    
    if (!navigator.geolocation) {
        showToast('Geolocation is not supported by your browser', 'error');
        return;
    }
    
    showToast('Getting your location...', 'info');
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            AppState.userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            
            showToast('Location found! Sorting by distance.', 'success');
            
            // Sort hospitals by distance
            const hospitalsWithDistance = AppState.hospitals.map(hospital => {
                const distance = calculateDistance(
                    AppState.userLocation.lat,
                    AppState.userLocation.lng,
                    hospital.lat,
                    hospital.lng
                );
                return { ...hospital, distance };
            });
            
            hospitalsWithDistance.sort((a, b) => a.distance - b.distance);
            renderHospitals(hospitalsWithDistance.slice(0, 10)); // Show top 10 nearest
            
        },
        (error) => {
            console.error('Geolocation error:', error);
            showToast('Unable to get your location. Please enable location services.', 'error');
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Login Handling
function handleLogin(e) {
    e.preventDefault();
    
    const hospitalId = document.getElementById('hospital-id').value.trim();
    const staffId = document.getElementById('staff-id').value.trim();
    const password = document.getElementById('password').value;
    
    if (!hospitalId || !staffId || !password) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    // Find hospital with matching credentials
    const hospital = AppState.hospitals.find(h => 
        h.staffLogin.hospitalId === hospitalId &&
        h.staffLogin.staffId === staffId &&
        h.staffLogin.password === password
    );
    
    if (hospital) {
        showToast('Login successful!', 'success');
        
        // Close login modal and open dashboard
        setTimeout(() => {
            closeAllModals();
            openStaffDashboard(hospital);
        }, 1000);
        
        // Clear form
        document.getElementById('login-form').reset();
        
    } else {
        showToast('Invalid credentials. Please try again.', 'error');
    }
}

function handleLogout() {
    AppState.currentUser = null;
    showToast('Logged out successfully', 'success');
    closeAllModals();
}

// Dashboard Functions
function initializeDashboard(hospital) {
    console.log('Initializing dashboard for:', hospital.name);
    
    // Update bed counts
    document.getElementById('icu-count').textContent = hospital.icu;
    document.getElementById('ventilator-count').textContent = hospital.ventilator;
    document.getElementById('oxygen-count').textContent = hospital.oxygen;
    document.getElementById('general-count').textContent = hospital.general;
    
    // Update statistics
    updateDashboardStats(hospital);
    
    // Load recent updates
    loadRecentUpdates(hospital);
    
    // Initialize map
    initializeMap(hospital);
}

function updateDashboardStats(hospital) {
    const totalCapacity = hospital.capacity;
    const availableNow = hospital.icu + hospital.ventilator + hospital.oxygen + hospital.general;
    const occupied = hospital.occupied;
    const occupancyRate = Math.round((occupied / totalCapacity) * 100);
    
    document.getElementById('total-capacity').textContent = totalCapacity;
    document.getElementById('available-now').textContent = availableNow;
    document.getElementById('occupancy-rate').textContent = `${occupancyRate}%`;
}

function loadRecentUpdates(hospital) {
    const updatesList = document.getElementById('updates-list');
    if (!updatesList) return;
    
    // Mock recent updates
    const updates = [
        { time: '10:30 AM', text: 'ICU bed became available' },
        { time: '09:15 AM', text: 'Patient discharged from ventilator' },
        { time: 'Yesterday, 4:45 PM', text: 'Oxygen bed reserved' },
        { time: 'Yesterday, 2:20 PM', text: 'General bed occupancy updated' }
    ];
    
    updatesList.innerHTML = updates.map(update => `
        <div class="update-item">
            <div>${update.text}</div>
            <div class="update-time">${update.time}</div>
        </div>
    `).join('');
}

function updateBedCount(type, change) {
    if (!AppState.currentUser) return;
    
    const hospital = AppState.hospitals.find(h => h.id === AppState.currentUser.hospitalId);
    if (!hospital) return;
    
    const currentCount = hospital[type];
    const newCount = Math.max(0, currentCount + change);
    
    if (newCount === currentCount) return;
    
    hospital[type] = newCount;
    
    // Update display
    document.getElementById(`${type}-count`).textContent = newCount;
    
    // Update statistics
    updateDashboardStats(hospital);
    
    // Add to updates
    addUpdate(`${type.toUpperCase()} ${change > 0 ? 'increased' : 'decreased'} to ${newCount}`);
    
    showToast(`${type.toUpperCase()} count updated`, 'success');
}

function addUpdate(text) {
    const updatesList = document.getElementById('updates-list');
    if (!updatesList) return;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
    
    const updateItem = document.createElement('div');
    updateItem.className = 'update-item';
    updateItem.innerHTML = `
        <div>${text}</div>
        <div class="update-time">${timeString}</div>
    `;
    
    updatesList.insertBefore(updateItem, updatesList.firstChild);
}

function saveHospitalChanges() {
    if (!AppState.currentUser) return;
    
    showToast('Changes saved successfully', 'success');
    
    // Update live status
    updateLiveStatus();
    
    // Update region stats
    updateRegionStats();
    
    // If patient portal is open, refresh it
    if (document.getElementById('patient-portal').classList.contains('active')) {
        filterHospitals();
    }
}

// Map Functions
function initializeMap(hospital) {
    const mapContainer = document.getElementById('map-container');
    if (!mapContainer) return;
    
    // Clear existing map
    if (AppState.map) {
        AppState.map.remove();
        AppState.markers = [];
    }
    
    // Create new map
    AppState.map = L.map('map-container').setView([hospital.lat, hospital.lng], 13);
    
    // Add tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors, © CARTO'
    }).addTo(AppState.map);
    
    // Add hospital marker
    const hospitalIcon = L.divIcon({
        className: 'hospital-marker',
        html: `<div style="background: #3b82f6; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">H</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });
    
    const marker = L.marker([hospital.lat, hospital.lng], { icon: hospitalIcon })
        .addTo(AppState.map)
        .bindPopup(`
            <strong>${hospital.name}</strong><br>
            ${hospital.address}<br>
            ICU: ${hospital.icu} | Ventilators: ${hospital.ventilator}
        `);
    
    AppState.markers.push(marker);
    
    // Add other hospitals as smaller markers
    AppState.hospitals.forEach(h => {
        if (h.id !== hospital.id) {
            const otherIcon = L.divIcon({
                className: 'other-hospital-marker',
                html: `<div style="background: #64748b; width: 20px; height: 20px; border-radius: 50%;"></div>`,
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            });
            
            const otherMarker = L.marker([h.lat, h.lng], { icon: otherIcon })
                .addTo(AppState.map)
                .bindPopup(`<strong>${h.name}</strong>`);
            
            AppState.markers.push(otherMarker);
        }
    });
}

// Utility Functions
function callHospital(phoneNumber) {
    if (confirm(`Call ${phoneNumber}?`)) {
        window.location.href = `tel:${phoneNumber}`;
    }
}

function getDirections(hospitalId) {
    const hospital = AppState.hospitals.find(h => h.id === hospitalId);
    if (!hospital) return;
    
    const url = `https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lng}`;
    window.open(url, '_blank');
}

function reserveBed(hospitalId) {
    const hospital = AppState.hospitals.find(h => h.id === hospitalId);
    if (!hospital) {
        showToast('Hospital not found', 'error');
        return;
    }
    
    if (hospital.icu + hospital.ventilator + hospital.oxygen === 0) {
        showToast('No critical care beds available at this hospital', 'warning');
        return;
    }
    
    if (confirm(`Reserve a bed at ${hospital.name}?\n\nPlease confirm that this is an emergency.`)) {
        showToast(`Bed reservation request sent to ${hospital.name}`, 'info');
        
        // Simulate reservation process
        setTimeout(() => {
            showToast(`Bed reserved at ${hospital.name}. Please proceed within 30 minutes.`, 'success');
            
            // Update hospital bed count (simulate)
            if (hospital.icu > 0) {
                hospital.icu--;
            } else if (hospital.ventilator > 0) {
                hospital.ventilator--;
            } else if (hospital.oxygen > 0) {
                hospital.oxygen--;
            }
            
            // Update displays
            updateLiveStatus();
            updateRegionStats();
            filterHospitals();
            
            // If staff dashboard is open for this hospital, update it
            if (AppState.currentUser && AppState.currentUser.hospitalId === hospitalId) {
                updateDashboardStats(hospital);
                document.getElementById('icu-count').textContent = hospital.icu;
                document.getElementById('ventilator-count').textContent = hospital.ventilator;
                document.getElementById('oxygen-count').textContent = hospital.oxygen;
            }
            
        }, 2000);
    }
}

function showToast(message, type = 'info') {
    console.log(`Toast [${type}]:`, message);
    
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' :
                 type === 'error' ? 'fa-times-circle' :
                 type === 'warning' ? 'fa-exclamation-circle' : 'fa-info-circle';
    
    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas ${icon}" style="font-size: 1.25rem;"></i>
            <span>${message}</span>
        </div>
        <button class="toast-close">&times;</button>
    `;
    
    container.appendChild(toast);
    
    // Add close button functionality
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.remove();
    });
    
    // Auto-remove after delay
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Loading State
function setLoading(loading) {
    const overlay = document.getElementById('loading-overlay');
    if (!overlay) return;
    
    if (loading) {
        overlay.classList.add('active');
        AppState.isLoading = true;
    } else {
        overlay.classList.remove('active');
        AppState.isLoading = false;
    }
}

// Add CSS for map markers
const style = document.createElement('style');
style.textContent = `
    .hospital-marker {
        background: transparent;
        border: none;
    }
    
    .other-hospital-marker {
        background: transparent;
        border: none;
    }
    
    .leaflet-container {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }
`;
document.head.appendChild(style);

// Export functions for HTML onclick attributes
window.callHospital = callHospital;
window.getDirections = getDirections;
window.reserveBed = reserveBed;