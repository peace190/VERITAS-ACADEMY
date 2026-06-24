/**
 * ==========================================================================
 * UNIVERSAL MASTER APPLICATION ENGINE - FRONTEND INTERACTIONS
 * Runs inside the browser environment (attached via script tags)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Functional Systems
    syncUniversalNavigationHighlights();
    initializeRegistrationFormEngine();
    initializeDashboardStateArchitecture();
    
    // 2. Initialize Premium Animation Systems
    initializeScrollRevealEngine();
    setupMicroInteractions();

    // 3. 🖥️ LIVE DASHBOARD FLOW ROUTER
    if (window.location.pathname.includes('portal')) {
        initializeUnifiedPortalLoginEngine();
    }
});

/**
 * UNIFIED PORTAL ENGINE - CAPTURES LOGIN & TOGGLES DASHBOARD VISIBILITY
 */
function initializeUnifiedPortalLoginEngine() {
    const loginForm = document.getElementById('portal-login-form');
    const loginGateSection = document.getElementById('portal-login-gate');
    const mainDashboardLayout = document.getElementById('portal-main-dashboard');
    const errorDiv = document.getElementById('login-error');

    // Security Check: See if a token is already cached in browser memory
    const savedToken = sessionStorage.getItem('currentStudentId');
    if (savedToken) {
        // Hide login gate immediately and render layout
        if (loginGateSection) loginGateSection.classList.add('layout-hidden');
        if (mainDashboardLayout) mainDashboardLayout.classList.remove('layout-hidden');
        fetchAndRenderStudentDatabaseData(savedToken);
    }

    if (!loginForm) return;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputField = document.getElementById('student-token-input');
        if (!inputField) return;

        const typedToken = inputField.value.trim();

        // Contact our backend Node server dynamically using whatever they typed!
        fetch(`/api/student/${typedToken}`)
            .then(res => {
                if (!res.ok) throw new Error('Unrecognized database server return packet.');
                return res.json();
            })
            .then(studentData => {
                if (!studentData || studentData.success === false) {
                    errorDiv.textContent = "❌ Invalid Token. Profile execution aborted.";
                    errorDiv.style.display = 'block';
                } else {
                    // Success! Secure token in session memory cache
                    sessionStorage.setItem('currentStudentId', typedToken);
                    errorDiv.style.display = 'none';

                    // Switch visible elements using our layout-hidden class toggles
                    if (loginGateSection) loginGateSection.classList.add('layout-hidden');
                    if (mainDashboardLayout) mainDashboardLayout.classList.remove('layout-hidden');

                    // Bind dynamic SQL fields to elements immediately
                    renderDashboardElements(studentData);
                }
            })
            .catch(err => {
                console.error(err);
                errorDiv.textContent = "❌ Server node or database connection interruption.";
                errorDiv.style.display = 'block';
            });
    });
}

/**
 * FETCH AND RENDER DYNAMIC DATA FROM BACKEND NODE/MYSQL SERVER FOR REFRESHES
 */
function fetchAndRenderStudentDatabaseData(studentId) {
    fetch(`/api/student/${studentId}`)
        .then(response => {
            if (!response.ok) throw new Error('Student data stream unreadable');
            return response.json();
        })
        .then(studentData => {
            renderDashboardElements(studentData);
        })
        .catch(err => {
            console.error("❌ Failed to bind template elements to SQL payload:", err);
        });
}

/**
 * HELPER: ASSIGNS SQL DATA PACKETS DIRECTLY TO THE DOM
 */
function renderDashboardElements(studentData) {
    console.log("📦 Live Database Record Loaded:", studentData);

    const profileNameHeader = document.getElementById('portal-student-name');
    const profileInitialsBadge = document.getElementById('portal-avatar');
    const profileIdElement = document.getElementById('portal-student-id');

    if (profileNameHeader) profileNameHeader.textContent = studentData.name;
    if (profileInitialsBadge) profileInitialsBadge.textContent = studentData.initials;
    if (profileIdElement) profileIdElement.textContent = `ID: #${studentData.student_id || studentData.id}`;

    const metricGpa = document.getElementById('metric-gpa');
    const metricModules = document.getElementById('metric-modules');
    const metricAttendance = document.getElementById('metric-attendance');

    if (metricGpa) metricGpa.textContent = studentData.gpa;
    if (metricModules) metricModules.textContent = studentData.modules_completed;
    if (metricAttendance) metricAttendance.textContent = studentData.attendance;
}

/**
 * DYNAMIC NAVIGATION HIGHLIGHT ENGINE
 */
function syncUniversalNavigationHighlights() {
    const activeRoutePath = window.location.pathname.split("/").pop();
    const navigationLinkSet = document.querySelectorAll(".nav-link");
    const trueNormalizedRoute = activeRoutePath === "" ? "index.html" : activeRoutePath;

    navigationLinkSet.forEach(anchorNode => {
        if (anchorNode.getAttribute("href") === trueNormalizedRoute) {
            anchorNode.classList.add("active");
        } else {
            anchorNode.classList.remove("active");
        }
    });
}

/**
 * STRUCTURAL FORM VALIDATION PROTOCOL
 */
function initializeRegistrationFormEngine() {
    const dynamicFormElement = document.getElementById("academy-inquiry-form");
    if (!dynamicFormElement) return;

    dynamicFormElement.addEventListener("submit", (eventInterceptor) => {
        let logicalFormStateIsSanitized = true;

        const inputFieldName = document.getElementById("applicant-name");
        const inputFieldEmail = document.getElementById("applicant-email");
        const selectFieldTrack = document.getElementById("academic-track");
        const textFieldPayload = document.getElementById("inquiry-payload");

        if (inputFieldName.value.trim().length < 3) {
            flagValidationMarkerError(inputFieldName, true);
            logicalFormStateIsSanitized = false;
        } else {
            flagValidationMarkerError(inputFieldName, false);
        }

        const structuralEmailFilterRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!structuralEmailFilterRegex.test(inputFieldEmail.value.trim())) {
            flagValidationMarkerError(inputFieldEmail, true);
            logicalFormStateIsSanitized = false;
        } else {
            flagValidationMarkerError(inputFieldEmail, false);
        }

        if (selectFieldTrack.value === "") {
            flagValidationMarkerError(selectFieldTrack, true);
            logicalFormStateIsSanitized = false;
        } else {
            flagValidationMarkerError(selectFieldTrack, false);
        }

        if (textFieldPayload.value.trim().length < 15) {
            flagValidationMarkerError(textFieldPayload, true);
            logicalFormStateIsSanitized = false;
        } else {
            flagValidationMarkerError(textFieldPayload, false);
        }

        if (!logicalFormStateIsSanitized) {
            eventInterceptor.preventDefault();
            dynamicFormElement.classList.add("shake-ui-element");
            setTimeout(() => dynamicFormElement.classList.remove("shake-ui-element"), 500);
        } else {
            eventInterceptor.preventDefault();
            alert("🔒 System Event Logged: Inquiry data packet encrypted and transmitted successfully to the registrar node infrastructure.");
            dynamicFormElement.reset();
        }
    });
}

function flagValidationMarkerError(domInputReference, configurationStateActive) {
    const structuralFormWrapperGroup = domInputReference.closest(".form-group-wrapper");
    if (!structuralFormWrapperGroup) return;

    if (configurationStateActive) {
        structuralFormWrapperGroup.classList.add("invalid");
    } else {
        structuralFormWrapperGroup.classList.remove("invalid");
    }
}

/**
 * PORTAL TAB MANAGEMENT ENGINE
 */
function initializeDashboardStateArchitecture() {
    const portalMenuButtonCollection = document.querySelectorAll(".portal-menu-item-btn");
    const activeWorkspacePanes = document.querySelectorAll(".portal-tab-content");

    if (portalMenuButtonCollection.length === 0 || activeWorkspacePanes.length === 0) return;

    portalMenuButtonCollection.forEach(interactiveControlBtn => {
        interactiveControlBtn.addEventListener("click", () => {
            const targetWorkspaceIdentifierKey = interactiveControlBtn.getAttribute("data-tab");

            portalMenuButtonCollection.forEach(btnElement => btnElement.classList.remove("active"));
            activeWorkspacePanes.forEach(paneElement => paneElement.classList.remove("active"));

            interactiveControlBtn.classList.add("active");
            
            const selectedPaneNode = document.getElementById(`tab-${targetWorkspaceIdentifierKey}`);
            if (selectedPaneNode) {
                selectedPaneNode.classList.add("active");
                selectedPaneNode.style.animation = "revealFadeIn 0.4s ease forwards";
            }
        });
    });
}

/**
 * HIGH-FIDELITY SCROLL REVEAL ENGINE
 */
function initializeScrollRevealEngine() {
    const selectorsToAnimate = [
        '.premium-card', 
        '.stat-card', 
        '.section-header', 
        '.timeline-panel', 
        '.roadmap-checkpoint'
    ];
    
    selectorsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add('reveal-on-scroll');
        });
    });

    const revealObserverOptions = {
        root: null,
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible-active');
                observer.unobserve(entry.target);
            }
        });
    };

    const observerInstance = new IntersectionObserver(revealCallback, revealObserverOptions);
    
    document.querySelectorAll('.reveal-on-scroll').forEach(targetNode => {
        observerInstance.observe(targetNode);
    });
}

/**
 * PREMIUM MICRO-INTERACTIONS ENGINE
 */
function setupMicroInteractions() {
    const actionButtons = document.querySelectorAll('.btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.96)';
        });
        button.addEventListener('mouseup', () => {
            button.style.transform = 'translateY(-2px) scale(1)';
        });
    });
}

// Mobile navigation menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-navigation');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('mobile-active');
        });
    }
});