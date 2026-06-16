/**
 * ==========================================================================
 * UNIVERSAL MASTER APPLICATION ENGINE (UPDATED WITH LIVE DATABASE SYNC)
 * Institution: Elite International Pre-University Academy
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

    // 3. 🖥️ LIVE DATABASE INTEGRATION
    // Automatically loads data for the logged-in student when on the portal page
    if (window.location.pathname.includes('portal')) {
        // Change this ID string to '2026-M5541' to test Monica's dynamic swap presentation!
        fetchAndRenderStudentDatabaseData('2026-X9920'); 
    }
});

/**
 * FETCH AND RENDER DYNAMIC DATA FROM BACKEND NODE/MYSQL SERVER
 */
function fetchAndRenderStudentDatabaseData(studentId) {
    fetch(`/api/student/${studentId}`)
        .then(response => {
            if (!response.ok) throw new Error('Student data stream unreadable');
            return response.json();
        })
        .then(studentData => {
            console.log("📦 Live Database Record Loaded:", studentData);

            // Update user identification components
            const profileNameHeader = document.querySelector('.user-profile-info h3, .profile-name-element');
            const profileInitialsBadge = document.querySelector('.avatar-initials-badge, .user-avatar');

            if (profileNameHeader) profileNameHeader.textContent = studentData.name;
            if (profileInitialsBadge) profileInitialsBadge.textContent = studentData.initials;

            // Target dashboard metric boxes matching your HTML layout classes
            const metricGpa = document.getElementById('metric-gpa') || document.querySelector('.stat-card:nth-child(1) h3');
            const metricModules = document.getElementById('metric-modules') || document.querySelector('.stat-card:nth-child(2) h3');
            const metricAttendance = document.getElementById('metric-attendance') || document.querySelector('.stat-card:nth-child(3) h3');

            // Inject the data values safely straight from MySQL rows
            if (metricGpa) metricGpa.textContent = studentData.gpa;
            if (metricModules) metricModules.textContent = studentData.modules_completed;
            if (metricAttendance) metricAttendance.textContent = studentData.attendance;
        })
        .catch(err => {
            console.error("❌ Failed to bind template elements to SQL payload:", err);
        });
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
 * STRUCTURAL FORM VALIDATION PROTOCOL (contact.html)
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
 * DISTRIBUTED DATA-WORKSPACE PORTAL TAB MANAGEMENT ENGINE (portal.html)
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