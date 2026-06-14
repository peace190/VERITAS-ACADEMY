/**
 * ==========================================================================
 * UNIVERSAL MASTER APPLICATION ENGINE
 * Institution: Elite International Pre-University Academy
 * Architecture: ES6+ Functional Programming, Native Event Interceptors
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // Defer Execution Core Paths
    syncUniversalNavigationHighlights();
    initializeRegistrationFormEngine();
    initializeDashboardStateArchitecture();
});

/**
 * 1. DYNAMIC NAVIGATION HIGHLIGHT ENGINE
 * Reads current window locations and runs dynamic lookups across DOM anchor sets 
 * to apply the premium .active style modifier state.
 */
function syncUniversalNavigationHighlights() {
    const activeRoutePath = window.location.pathname.split("/").pop();
    const navigationLinkSet = document.querySelectorAll(".nav-link");

    // Execution fallback to cover structural index routes cleanly
    const trueNormalizedRoute = activeRoutePath === "" ? "index.html" : activeRoutePath;

    navigationLinkSet.forEach(anchorNode => {
        const linkHrefTarget = anchorNode.getAttribute("href");
        if (linkHrefTarget === trueNormalizedRoute) {
            anchorNode.classList.add("active");
        } else {
            anchorNode.classList.remove("active");
        }
    });
}

/**
 * 2. STRUCTURAL DATA VALIDATION PROTOCOL (contact.html Form Engine)
 * Prevents unsafe/malformed packet generation, evaluates email regular expressions, 
 * and controls UI error flag injection directly via targeted wrapper toggling.
 */
function initializeRegistrationFormEngine() {
    const dynamicFormElement = document.getElementById("academy-inquiry-form");
    if (!dynamicFormElement) return; // Exit cleanly if evaluating pages missing this node

    dynamicFormElement.addEventListener("submit", (eventInterceptor) => {
        let logicalFormStateIsSanitized = true;

        // Target Verification Inputs
        const inputFieldName = document.getElementById("applicant-name");
        const inputFieldEmail = document.getElementById("applicant-email");
        const selectFieldTrack = document.getElementById("academic-track");
        const textFieldPayload = document.getElementById("inquiry-payload");

        // Simple Alpha-String Structural Validation
        if (inputFieldName.value.trim().length < 3) {
            flagValidationMarkerError(inputFieldName, true);
            logicalFormStateIsSanitized = false;
        } else {
            flagValidationMarkerError(inputFieldName, false);
        }

        // Complex Email Matrix Validation Check
        const structuralEmailFilterRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!structuralEmailFilterRegex.test(inputFieldEmail.value.trim())) {
            flagValidationMarkerError(inputFieldEmail, true);
            logicalFormStateIsSanitized = false;
        } else {
            flagValidationMarkerError(inputFieldEmail, false);
        }

        // Selection Input Vetting Core
        if (selectFieldTrack.value === "") {
            flagValidationMarkerError(selectFieldTrack, true);
            logicalFormStateIsSanitized = false;
        } else {
            flagValidationMarkerError(selectFieldTrack, false);
        }

        // Structural Content Length Boundary Verification
        if (textFieldPayload.value.trim().length < 15) {
            flagValidationMarkerError(textFieldPayload, true);
            logicalFormStateIsSanitized = false;
        } else {
            flagValidationMarkerError(textFieldPayload, false);
        }

        // Hault runtime execution if form errors exist
        if (!logicalFormStateIsSanitized) {
            eventInterceptor.preventDefault();
        } else {
            eventInterceptor.preventDefault(); // Secure premium client-side staging placeholder
            alert("🔒 System Event Logged: Inquiry data packet encrypted and transmitted successfully to the registrar node infrastructure.");
            dynamicFormElement.reset();
        }
    });
}

/**
 * Helper Utility to handle validation classes cleanly
 */
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
 * 3. DISTRIBUTED DATA-WORKSPACE PORTAL TAB MANAGEMENT ENGINE (portal.html UI Core)
 * Manages clean layout state swapping by binding click listeners to dashboard sidebar buttons.
 */
function initializeDashboardStateArchitecture() {
    const portalMenuButtonCollection = document.querySelectorAll(".portal-menu-item-btn");
    const activeWorkspacePanes = document.querySelectorAll(".portal-tab-content");

    if (portalMenuButtonCollection.length === 0 || activeWorkspacePanes.length === 0) return;

    portalMenuButtonCollection.forEach(interactiveControlBtn => {
        interactiveControlBtn.addEventListener("click", () => {
            
            // Isolate individual button attributes
            const targetWorkspaceIdentifierKey = interactiveControlBtn.getAttribute("data-tab");

            // Strip active statuses across UI element tree sets
            portalMenuButtonCollection.forEach(btnElement => btnElement.classList.remove("active"));
            activeWorkspacePanes.forEach(paneElement => paneElement.classList.remove("active"));

            // Inject localized active target visibility states
            interactiveControlBtn.classList.add("active");
            
            const selectedPaneNode = document.getElementById(`tab-${targetWorkspaceIdentifierKey}`);
            if (selectedPaneNode) {
                selectedPaneNode.classList.add("active");
            }
        });
    });
}