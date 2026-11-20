/**
 * ==============================================================================
 * ZEE CHAI — GOOGLE REVIEW HELPER
 * Multi-Outlet Static Review & Feedback Page
 *
 * NOTE:
 * - Pure static vanilla JS, zero backend, zero database, zero external API calls.
 * - Supports URL query param: review.zechai.in?outlet=taliparamba
 * ==============================================================================
 */

// ==============================================================================
// 1. OUTLET CONFIGURATION
//
// IMPORTANT: The Google review URL must open the review FORM directly on desktop & mobile.
// Format: https://search.google.com/local/writereview?placeid=PLACE_ID
// To find/confirm a Place ID:
// 1. Go to https://developers.google.com/maps/documentation/places/web-service/place-id
// 2. Search for the outlet name (e.g., 'Zechai Taliparamba' or 'Zechai Palakkad')
// 3. Copy the Place ID
// 4. Test the URL: https://search.google.com/local/writereview?placeid=PLACE_ID
// ==============================================================================
const outlets = {
  // // REPLACE: OUTLET CONFIG
  "taliparamba": {
    id: "taliparamba",
    name: "Zechai Taliparamba",
    shortName: "Taliparamba",
    // Direct Google Review Form URL (Works on both desktop and mobile)
    googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJmUuMVgA_pDsRTY-5ly7h7SM",
    // Manager WhatsApp Number
    whatsapp: "918086052565"
  },
  "palakkad": {
    id: "palakkad",
    name: "Zechai Palakkad",
    shortName: "Palakkad",
    // Direct Google Review Form URL (Works on both desktop and mobile)
    googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJaYxfHQBtqDsROu9Gd-qUqpQ",
    // Manager WhatsApp Number
    whatsapp: "918129129031"
  },
  "manjeri": {
    id: "manjeri",
    name: "Zechai Manjeri",
    shortName: "Manjeri",
    // Direct Google Review Form URL (Works on both desktop and mobile)
    googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJIflZzME3pjsRwebfN_s05mE",
    // Manager WhatsApp Number
    whatsapp: "919633500530"
  },
  "nilambur": {
    id: "nilambur",
    name: "Zechai Nilambur",
    shortName: "Nilambur",
    // Direct Google Review Form URL (Works on both desktop and mobile)
    googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJlTOHfI89pjsRjNoF1E9-HHM",
    // Manager WhatsApp Number
    whatsapp: "916238673946"
  }
};

// ==============================================================================
// 2. TAG DEFINITIONS WITH INLINE SVGs (Zero Emoji)
// ==============================================================================
const SVG_ICONS = {
  // Positive Tag Icons
  cup: `<svg class="tag-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 0 1 0 8h-1"></path><path d="M3 8h14v7a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="2" x2="6" y2="5"></line><line x1="10" y1="2" x2="10" y2="5"></line><line x1="14" y1="2" x2="14" y2="5"></line></svg>`,
  lightning: `<svg class="tag-svg-icon" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
  smile: `<svg class="tag-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>`,
  rupee: `<svg class="tag-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="4" x2="18" y2="4"></line><line x1="6" y1="8.5" x2="18" y2="8.5"></line><path d="M6 4h7a4 4 0 0 1 0 8H6l8 8"></path></svg>`,
  sparkle: `<svg class="tag-svg-icon" viewBox="0 0 24 24" fill="currentColor"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"></path></svg>`,
  pin: `<svg class="tag-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
  thumbsUp: `<svg class="tag-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"></path><path d="M15 10h4a2 2 0 0 1 2 2v2a2 2 0 0 1-.5 1.3l-2.7 5.4A2 2 0 0 1 16 22H7v-12l4-7a2 2 0 0 1 2 2v5z"></path></svg>`,
  snack: `<svg class="tag-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="8.5" cy="9.5" r="1.2" fill="currentColor"></circle><circle cx="15.5" cy="8.5" r="1.2" fill="currentColor"></circle><circle cx="10.5" cy="15.5" r="1.2" fill="currentColor"></circle><circle cx="15.5" cy="14.5" r="1.2" fill="currentColor"></circle></svg>`,
  star: `<svg class="tag-svg-icon" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,

  // Negative Tag Icons
  clock: `<svg class="tag-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
  frown: `<svg class="tag-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line><path d="M16 16s-1.5-2-4-2-4 2-4 2"></path></svg>`,
  notClean: `<svg class="tag-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>`,
  overpriced: `<svg class="tag-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="5" x2="14" y2="5"></line><line x1="4" y1="9" x2="12" y2="9"></line><path d="M4 5h5a3.5 3.5 0 0 1 0 7H4l6 7"></path><line x1="17" y1="11" x2="21" y2="7"></line><polyline points="17 7 21 7 21 11"></polyline></svg>`,
  thumbsDown: `<svg class="tag-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 14V2"></path><path d="M15 14h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-.5-1.3l-2.7-5.4A2 2 0 0 0 16 2H7v12l4 7a2 2 0 0 0 2-2v-5z"></path></svg>`,
  wrongOrder: `<svg class="tag-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`
};

const POSITIVE_TAGS = [
  { id: "great-chai", label: "Great Chai", iconSvg: SVG_ICONS.cup },
  { id: "quick-service", label: "Quick Service", iconSvg: SVG_ICONS.lightning },
  { id: "friendly-staff", label: "Friendly Staff", iconSvg: SVG_ICONS.smile },
  { id: "value-for-money", label: "Value for Money", iconSvg: SVG_ICONS.rupee },
  { id: "clean-hygienic", label: "Clean & Hygienic", iconSvg: SVG_ICONS.sparkle },
  { id: "nice-location", label: "Nice Location", iconSvg: SVG_ICONS.pin },
  { id: "would-recommend", label: "Would Recommend", iconSvg: SVG_ICONS.thumbsUp },
  { id: "good-snacks", label: "Good Snacks", iconSvg: SVG_ICONS.snack },
  { id: "consistent-quality", label: "Consistent Quality", iconSvg: SVG_ICONS.star }
];

const NEGATIVE_TAGS = [
  { id: "slow-service", label: "Slow Service", iconSvg: SVG_ICONS.clock },
  { id: "rude-staff", label: "Rude Staff", iconSvg: SVG_ICONS.frown },
  { id: "not-clean", label: "Not Clean", iconSvg: SVG_ICONS.notClean },
  { id: "overpriced", label: "Overpriced", iconSvg: SVG_ICONS.overpriced },
  { id: "bad-taste", label: "Bad Taste", iconSvg: SVG_ICONS.thumbsDown },
  { id: "wrong-order", label: "Wrong Order", iconSvg: SVG_ICONS.wrongOrder }
];

// ==============================================================================
// 3. SENTENCE BANK (NO OUTLET NAMES IN REVIEW TEXT)
// Reviews are generic, authentic, and natural.
// ==============================================================================
const sentenceBank = {
  "great-chai": [
    "Loved the chai here, really well made.",
    "The chai was excellent, perfectly brewed.",
    "Best chai I've had in a while, hit the spot."
  ],
  "quick-service": [
    "Got our order super quick, no waiting around.",
    "Service was fast, impressed by the speed.",
    "Everything came out really quickly."
  ],
  "friendly-staff": [
    "The staff were really friendly and welcoming.",
    "Warm and friendly team, made the experience better.",
    "Staff were polite and helpful throughout."
  ],
  "value-for-money": [
    "Great value for the price.",
    "Very affordable for what you get.",
    "Definitely worth every rupee."
  ],
  "clean-hygienic": [
    "The place was clean and well-maintained.",
    "Really liked how clean and hygienic everything was.",
    "Neat and tidy setup, good to see."
  ],
  "nice-location": [
    "Convenient location, easy to find.",
    "Good spot, comfortable seating too.",
    "Nice location and pleasant atmosphere."
  ],
  "would-recommend": [
    "Would definitely recommend to friends and family.",
    "Already told people about this place!",
    "Will be coming back for sure."
  ],
  "good-snacks": [
    "The snacks were great too, not just the chai.",
    "Tried the snacks, solid options alongside the chai.",
    "Food was good, nice variety."
  ],
  "consistent-quality": [
    "Every visit, the quality stays the same, that's rare.",
    "They maintain their standard really well.",
    "Consistent quality every time I come."
  ]
};

// Generic closers that do NOT include any specific outlet name
const CLOSING_SENTENCES = [
  "Great spot for chai lovers.",
  "Definitely coming back for more.",
  "Highly recommend this spot!",
  "Keep up the great work!"
];

// ==============================================================================
// 4. APP STATE & ELEMENT REFERENCES
// ==============================================================================
let currentOutlet = null;
const selectedPositiveTags = new Set();
const selectedNegativeTags = new Set();

const screenOutletSelect = document.getElementById("screenOutletSelect");
const screenReviewFlow = document.getElementById("screenReviewFlow");
const outletListContainer = document.getElementById("outletListContainer");

const outletBadge = document.getElementById("outletBadge");
const outletBadgeText = document.getElementById("outletBadgeText");
const experienceHeading = document.getElementById("experienceHeading");

const positiveTagsWrap = document.getElementById("positiveTagsWrap");
const negativeTagsWrap = document.getElementById("negativeTagsWrap");

const positiveFlowContainer = document.getElementById("positiveFlowContainer");
const negativeFlowContainer = document.getElementById("negativeFlowContainer");
const generateCtaWrapper = document.getElementById("generateCtaWrapper");
const draftOutputWrapper = document.getElementById("draftOutputWrapper");

const btnWriteForMe = document.getElementById("btnWriteForMe");
const btnWriteForMeText = document.getElementById("btnWriteForMeText");
const positiveDraftTextarea = document.getElementById("positiveDraftTextarea");
const btnRegenerateDraft = document.getElementById("btnRegenerateDraft");
const btnChangeSelections = document.getElementById("btnChangeSelections");

const btnCopyAndOpenGoogle = document.getElementById("btnCopyAndOpenGoogle");

const negativeFeedbackTextarea = document.getElementById("negativeFeedbackTextarea");
const btnWhatsAppChannel = document.getElementById("btnWhatsAppChannel");

const toastNotification = document.getElementById("toastNotification");
const toastMessage = document.getElementById("toastMessage");
let toastTimer = null;

// ==============================================================================
// 5. HELPER FUNCTIONS & AUTO-RESIZING
// ==============================================================================

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function showToast(message = "Copied! Opening Google Reviews...") {
  if (toastTimer) clearTimeout(toastTimer);
  toastMessage.textContent = message;
  toastNotification.classList.add("show");
  toastTimer = setTimeout(() => {
    toastNotification.classList.remove("show");
  }, 2400);
}

/**
 * Automatically adjusts textarea height so it fits content without an inner scrollbar
 */
function autoResizeTextarea(textarea) {
  if (!textarea) return;
  textarea.style.height = "auto";
  textarea.style.height = `${Math.max(105, textarea.scrollHeight + 4)}px`;
}

/**
 * Robust clipboard copy function with fallback for mobile in-app browsers
 */
async function copyToClipboard(text) {
  if (!text) return false;

  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn("navigator.clipboard failed, attempting fallback:", err);
    }
  }

  // Fallback for non-secure / in-app browsers
  try {
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = text;
    tempTextArea.style.position = "fixed";
    tempTextArea.style.left = "-9999px";
    tempTextArea.style.top = "0";
    document.body.appendChild(tempTextArea);
    tempTextArea.focus();
    tempTextArea.select();
    const successful = document.execCommand("copy");
    document.body.removeChild(tempTextArea);
    return successful;
  } catch (err) {
    console.error("Copy fallback failed:", err);
    return false;
  }
}

// ==============================================================================
// 6. OUTLET MANAGEMENT & ROUTING
// ==============================================================================

function setOutlet(outlet) {
  currentOutlet = outlet;

  // Show review flow directly
  screenOutletSelect.style.display = "none";
  screenReviewFlow.style.display = "flex";

  // Location pill above the heading
  outletBadge.style.display = "inline-flex";
  outletBadgeText.textContent = outlet.shortName || outlet.name;

  // Heading is short and punchy: "How was your visit?"
  experienceHeading.textContent = "How was your visit?";

  // WhatsApp Link update
  updateWhatsAppLink();

  // Render tag pills
  renderTagPills();
  updateFlowState();
}

function updateWhatsAppLink() {
  if (!currentOutlet || !btnWhatsAppChannel) return;

  const notes = negativeFeedbackTextarea.value.trim();
  const outletDisplayName = currentOutlet.name.startsWith("Zechai")
    ? currentOutlet.name
    : `Zechai ${currentOutlet.name}`;

  let messageText = "";
  if (notes) {
    messageText = `Hi, I visited ${outletDisplayName} and had some feedback: ${notes}`;
  } else {
    messageText = `Hi, I visited ${outletDisplayName} and wanted to share some feedback.`;
  }

  const encodedMessage = encodeURIComponent(messageText);
  btnWhatsAppChannel.href = `https://wa.me/${currentOutlet.whatsapp}?text=${encodedMessage}`;
}

function renderOutletSelector() {
  screenReviewFlow.style.display = "none";
  screenOutletSelect.style.display = "flex";
  outletBadge.style.display = "none";

  outletListContainer.innerHTML = "";
  Object.keys(outlets).forEach((key) => {
    const item = outlets[key];
    const card = document.createElement("a");
    card.className = "outlet-card-item";
    card.href = `?outlet=${key}`;
    card.innerHTML = `
      <div class="outlet-card-left">
        <div class="outlet-store-icon">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </div>
        <div class="outlet-info-col">
          <span class="outlet-card-title">${item.name}</span>
          <span class="outlet-card-sub">Tap to leave your review</span>
        </div>
      </div>
      <div class="outlet-arrow-badge">→</div>
    `;

    card.addEventListener("click", (e) => {
      e.preventDefault();
      const url = new URL(window.location);
      url.searchParams.set("outlet", key);
      window.history.pushState({}, "", url);
      setOutlet(item);
    });

    outletListContainer.appendChild(card);
  });
}

// ==============================================================================
// 7. PILL-STYLE TAG CHIPS (WITH INLINE SVGs)
// ==============================================================================

function renderTagPills() {
  // Positive Chips
  positiveTagsWrap.innerHTML = "";
  POSITIVE_TAGS.forEach((tag) => {
    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = `tag-pill positive ${selectedPositiveTags.has(tag.id) ? "selected" : ""}`;
    pill.dataset.id = tag.id;
    pill.innerHTML = `
      ${tag.iconSvg}
      <span class="tag-pill-text">${tag.label}</span>
    `;

    pill.addEventListener("click", () => {
      if (selectedPositiveTags.has(tag.id)) {
        selectedPositiveTags.delete(tag.id);
        pill.classList.remove("selected");
      } else {
        selectedPositiveTags.add(tag.id);
        pill.classList.add("selected");
      }
      handleTagChange();
    });

    positiveTagsWrap.appendChild(pill);
  });

  // Negative Chips
  negativeTagsWrap.innerHTML = "";
  NEGATIVE_TAGS.forEach((tag) => {
    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = `tag-pill negative ${selectedNegativeTags.has(tag.id) ? "selected" : ""}`;
    pill.dataset.id = tag.id;
    pill.innerHTML = `
      ${tag.iconSvg}
      <span class="tag-pill-text">${tag.label}</span>
    `;

    pill.addEventListener("click", () => {
      if (selectedNegativeTags.has(tag.id)) {
        selectedNegativeTags.delete(tag.id);
        pill.classList.remove("selected");
      } else {
        selectedNegativeTags.add(tag.id);
        pill.classList.add("selected");
      }
      handleTagChange();
    });

    negativeTagsWrap.appendChild(pill);
  });
}

function handleTagChange() {
  updateFlowState();

  // If already in positive draft mode and tags changed, update draft live
  if (selectedNegativeTags.size === 0 && draftOutputWrapper.style.display !== "none") {
    if (selectedPositiveTags.size === 0) {
      draftOutputWrapper.style.display = "none";
      generateCtaWrapper.style.display = "block";
    } else {
      positiveDraftTextarea.value = generateReviewDraft();
      autoResizeTextarea(positiveDraftTextarea);
    }
  }
}

function updateFlowState() {
  const totalPositive = selectedPositiveTags.size;
  const totalNegative = selectedNegativeTags.size;

  // CASE B: ANY NEGATIVE TAG SELECTED
  if (totalNegative > 0) {
    positiveFlowContainer.style.display = "none";
    negativeFlowContainer.style.display = "block";
    updateWhatsAppLink();
    autoResizeTextarea(negativeFeedbackTextarea);
    return;
  }

  // CASE A: ONLY POSITIVE TAGS (OR ZERO TAGS)
  negativeFlowContainer.style.display = "none";
  positiveFlowContainer.style.display = "block";

  if (totalPositive === 0) {
    btnWriteForMe.disabled = true;
    btnWriteForMeText.textContent = "Pick what you liked first";
    draftOutputWrapper.style.display = "none";
    generateCtaWrapper.style.display = "block";
  } else {
    btnWriteForMe.disabled = false;
    btnWriteForMeText.textContent = "Write it for me";
  }
}

// ==============================================================================
// 8. DRAFT GENERATION (GENERIC, NO OUTLET NAME IN TEXT)
// ==============================================================================

function generateReviewDraft() {
  if (selectedPositiveTags.size === 0) return "";

  const sentences = [];

  // Pick one random variation sentence per selected positive tag
  selectedPositiveTags.forEach((tagId) => {
    const bank = sentenceBank[tagId];
    if (bank && bank.length > 0) {
      sentences.push(getRandomItem(bank));
    }
  });

  // Add an optional natural closer (if not too long)
  if (sentences.length <= 4) {
    sentences.push(getRandomItem(CLOSING_SENTENCES));
  }

  return sentences.join(" ");
}

// Tapping "Write it for me" reveals draft on SAME page
btnWriteForMe.addEventListener("click", () => {
  if (selectedPositiveTags.size === 0) return;

  positiveDraftTextarea.value = generateReviewDraft();
  autoResizeTextarea(positiveDraftTextarea);

  // Reveal accordion on the SAME continuous page
  draftOutputWrapper.style.display = "block";

  // Smooth scroll down to draft
  setTimeout(() => {
    draftOutputWrapper.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 50);
});

// "← Change selections" smooth scroll back to tags
if (btnChangeSelections) {
  btnChangeSelections.addEventListener("click", (e) => {
    e.preventDefault();
    const tagSection = document.getElementById("tagSectionContainer");
    if (tagSection) {
      tagSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

// "🔄 Try different words"
btnRegenerateDraft.addEventListener("click", () => {
  positiveDraftTextarea.value = generateReviewDraft();
  autoResizeTextarea(positiveDraftTextarea);
  showToast("Generated new wording! ✨");
});

// Textarea auto-resize listeners
positiveDraftTextarea.addEventListener("input", () => {
  autoResizeTextarea(positiveDraftTextarea);
});

negativeFeedbackTextarea.addEventListener("input", () => {
  autoResizeTextarea(negativeFeedbackTextarea);
  updateWhatsAppLink();
});

// ==============================================================================
// 9. "COPY & OPEN GOOGLE" ACTION (SINGLE ACTION BUTTON)
// ==============================================================================

function executeCopyAndOpenGoogle(reviewText) {
  const targetUrl = currentOutlet ? currentOutlet.googleReviewUrl : "https://www.google.com";

  // Step 1: Copy to clipboard
  copyToClipboard(reviewText);

  // Step 2: Confirmation toast
  showToast("Copied! Opening Google Reviews...");

  // Step 3: Open direct review form URL in a new tab
  window.open(targetUrl, "_blank");
}

// PRIMARY: Copy & Open Google (Positive Flow Only)
btnCopyAndOpenGoogle.addEventListener("click", () => {
  const text = positiveDraftTextarea.value.trim();
  executeCopyAndOpenGoogle(text);
});

// Update WhatsApp link on click to ensure latest textarea content
if (btnWhatsAppChannel) {
  btnWhatsAppChannel.addEventListener("click", updateWhatsAppLink);
}

// Logo click resets to top
const brandLogo = document.getElementById("brandLogo");
if (brandLogo) {
  brandLogo.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ==============================================================================
// 10. INITIALIZATION & QUERY PARAM ROUTING
// ==============================================================================
function initApp() {
  const params = new URLSearchParams(window.location.search);
  const outletKey = params.get("outlet");

  if (outletKey && outlets[outletKey.toLowerCase()]) {
    // Valid outlet passed in URL query param: directly show the review flow!
    setOutlet(outlets[outletKey.toLowerCase()]);
  } else {
    // No outlet specified or unrecognized: fallback to outlet selector
    renderOutletSelector();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
