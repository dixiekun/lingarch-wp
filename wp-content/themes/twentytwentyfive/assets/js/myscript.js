// Dropdown toggle
document.querySelectorAll('.dropdown-parent > a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const dropdown = this.nextElementSibling;
    
    // Close all other open dropdowns (optional)
    document.querySelectorAll('.dropdown-menu.open').forEach(menu => {
      if (menu !== dropdown) menu.classList.remove('open');
    });

    // Toggle current dropdown
    if (dropdown && dropdown.classList.contains('dropdown-menu')) {
      dropdown.classList.toggle('open');
    }
  });
});


// Counter animation
function animateCounter(element, target) {
  let count = 0;
  const screenSize = window.innerWidth;
  const speed = screenSize < 768 ? 100 : 200;
  const increment = target / speed;

  const updateCounter = () => {
    count += increment;
    if (count >= target) {
      element.textContent = target;
    } else {
      element.textContent = Math.ceil(count);
      requestAnimationFrame(updateCounter);
    }
  };

  updateCounter();
}

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".number");
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute("data-target"));
    if (!isNaN(target)) {
      animateCounter(counter, target);
    }
  });
});

// Owl Carousel initializations
$(document).ready(function () {
  $('.brand-carousel').owlCarousel({
    autoplay: true,
    loop: true,
    margin: 15,
    dots: false,
    slideTransition: "linear",
    autoHeight: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: false,
    autoplaySpeed: 1500,
    navText: false,
    responsive: {
      0: { items: 2 },
      600: { items: 4 },
      1000: { items: 6 }
    }
  });

  $(".case-carousel").owlCarousel({
    loop: true,
    margin: 10,
    autoplay: false,
    smartSpeed: 800,
    dots: true,
    nav: true,
    autoWidth: true,
    responsive: {
      0: { items: 1, autoWidth: false },
      750: { autoWidth: true }
    }
  });
  $('.latest_main_div').owlCarousel({
      loop: true,
      margin: 30,
      dots: false,
      nav: false,
      responsive:{
        0:{ items:1 },
        600:{ items:2 },
        1000:{ items:3 }
      }
    });

});

// Toggle dropdown on parent click
document.querySelectorAll('.dropdown-parent > a').forEach(a => {
  a.addEventListener('click', e => {
    const parent = a.parentElement;
    parent.classList.toggle('open');
    e.preventDefault();
  });
});

// Typing effect
const config = {
  "t_animated_words_banner": {
    "show_cursor": "0",
    "typing_speed": "low",
    "text_items": [
      ["customers", "audience", "clients", "patience", "viewers", "stakeholders"],
      ["content", "legal documents", "treatment plan", "voice-over", "communication"]
    ]
  }
};

const banners = [
  {
    textId: 'text-1',
    caretId: 'caret-1',
    words: config.t_animated_words_banner.text_items[0]
  },
  {
    textId: 'text-2',
    caretId: 'caret-2',
    words: config.t_animated_words_banner.text_items[1]
  }
];

banners.forEach(({ textId, caretId, words }) => {
  const textEl = document.getElementById(textId);
  const caretEl = document.getElementById(caretId);

  if (config.t_animated_words_banner.show_cursor === "0" && caretEl) {
    caretEl.style.display = "none";
  }

  if (!textEl) return;

  let wordIndex = 0;
  let charIndex = 0;

  function typeWord() {
    const word = words[wordIndex];
    textEl.textContent = word.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex < word.length) {
      setTimeout(typeWord, 100);
    } else {
      setTimeout(() => {
        eraseWord(() => {
          wordIndex = (wordIndex + 1) % words.length;
          charIndex = 0;
          typeWord();
        });
      }, 3000);
    }
  }

  function eraseWord(callback) {
    const current = textEl.textContent;
    if (current.length > 0) {
      textEl.textContent = current.slice(0, -1);
      setTimeout(() => eraseWord(callback), 50);
    } else {
      callback();
    }
  }

  typeWord();
});

$(document).ready(function(){
    $('.case-study-carousel').owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      dots: true,
      autoplay: true,
          slideTransition: "linear",
      autoplayTimeout: 4000,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 1
        },
        1024: {
          items: 1
        }
      }
    });
  });
   $(document).ready(function () {
    var rows = $(".case-row");
    var rowsToShow = 4;
    var increment = 2;

    rows.hide();
    rows.slice(0, rowsToShow).show();

    $("#loadMoreBtn").click(function () {
      rowsToShow += increment;
      rows.slice(0, rowsToShow).slideDown();

      if (rowsToShow >= rows.length) {
        $(this).hide();
      }
    });
  });

$(document).ready(function() {
  var items = $(".blog_section_main_div .div_blog_list");
  var numItems = items.length;
  var perPage = 9;

  // Initially hide all and show the first set
  items.hide().slice(0, perPage).show();

  // Only apply pagination if needed
  if (numItems > perPage) {
    $('#pagination-container').pagination({
      items: numItems,
      itemsOnPage: perPage,
      prevText: "&laquo;",
      nextText: "&raquo;",
      onPageClick: function (pageNumber) {
        var showFrom = perPage * (pageNumber - 1);
        var showTo = showFrom + perPage;
        items.hide().slice(showFrom, showTo).show();
      }
    });
  } else {
    $('#pagination-container').hide(); // Hide if no pagination needed
  }
});

$(document).ready(function(){
  $('.featured_blog_main').owlCarousel({
    loop:true,
    margin:30,
    nav:true,
    dots: false,
    navText: [
      '<i class="fa-solid fa-arrow-left"></i>',
      '<i class="fa-solid fa-arrow-right"></i>'
    ],
    responsive:{
      0:{ items:1 },
      768:{ items:1 },
      1200:{ items:1 }
    }
  });
});

// (FAQ script removed)

$(document).ready(function() {
  // Configuration - set this to control when the script should run
  const ENABLE_HEIGHT_SYNC = true; // Set to false to disable the script
  const MIN_SCREEN_WIDTH = 996; // Minimum screen width to run the script
  
  // Early exit if script is disabled
  if (!ENABLE_HEIGHT_SYNC) {
    console.log('Height sync script is disabled');
    return;
  }

  // Function to check if script should run based on conditions
  function shouldRunScript() {
    const screenWidth = $(window).innerWidth();
    const isLargeScreen = screenWidth > MIN_SCREEN_WIDTH;
    
    // Check if ANY service sections exist (more flexible)
    const hasRequiredElements = $('.service-text-1, .service-text-2, .service-text-3').length > 0 ||
                               $('.service-image-1, .service-image-2, .service-image-3').length > 0;
    
    return isLargeScreen && hasRequiredElements;
  }

  // Function to sync heights for a specific section
  function syncHeights(contentSelector, imgSelector) {
    // Get the content div and image container
    var $contentDiv = $(contentSelector);
    var $imgContainer = $(imgSelector);
        
    // Only proceed if both elements exist
    if ($contentDiv.length && $imgContainer.length) {
      // Get the image element
      var $img = $imgContainer.find('img');
            
      // Only proceed if the image exists
      if ($img.length) {
        // Get the content height
        var contentHeight = $contentDiv.outerHeight();
                
        // Set the image container height to match content height
        $imgContainer.height(contentHeight);
                
        // Make the image fill the container while maintaining aspect ratio
        $img.css({
          'height': '100%',
          'object-fit': 'cover'
        });
                
        // Log success for debugging
        console.log('Synced heights for ' + contentSelector + ' and ' + imgSelector);
      }
    }
    // Removed warning logs to prevent console spam when elements don't exist
  }

  // Function to reset heights (useful when hiding/disabling)
  function resetHeights() {
    $('.service-image-1, .service-image-2, .service-image-3').css('height', '');
    $('.service-image-1 img, .service-image-2 img, .service-image-3 img').css({
      'height': '',
      'object-fit': ''
    });
    console.log('Heights reset to default');
  }

  // Function to sync heights for all sections
  function syncAllHeights() {
    // Check if script should run
    if (!shouldRunScript()) {
      console.log('Height sync conditions not met - skipping');
      resetHeights(); // Reset any previous height adjustments
      return;
    }

    // Check if any required elements exist before attempting sync
    const sections = [
      { content: '.service-text-1', image: '.service-image-1', name: 'Section 1' },
      { content: '.service-text-2', image: '.service-image-2', name: 'Section 2' },
      { content: '.service-text-3', image: '.service-image-3', name: 'Section 3' }
    ];

    let foundSections = 0;
    
    sections.forEach(section => {
      const hasContent = $(section.content).length > 0;
      const hasImage = $(section.image).length > 0;
      
      if (hasContent && hasImage) {
        foundSections++;
        try {
          syncHeights(section.content, section.image);
        } catch (e) {
          console.error(`Error syncing ${section.name}:`, e);
        }
      }
    });

    // Only log if no sections were found (to avoid console spam)
    if (foundSections === 0) {
      console.log('No service sections found on this page - height sync not needed');
    } else {
      console.log(`Height sync applied to ${foundSections} section(s)`);
    }
  }

  // Function to handle visibility toggle
  function toggleHeightSync(enable) {
    if (enable && shouldRunScript()) {
      syncAllHeights();
    } else {
      resetHeights();
    }
  }

  // Initial run
  syncAllHeights();
  
  // Run when images are loaded (for more accuracy)
  $(window).on('load', syncAllHeights);
  
  // Additional attempt after a slight delay to handle any delayed rendering
  setTimeout(syncAllHeights, 500);
  
  // Run on window resize
  $(window).on('resize', function() {
    // Add a small debounce to prevent excessive calls
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(syncAllHeights, 100);
  });

  // Optional: Expose control functions globally for manual control
  window.heightSyncControls = {
    enable: function() { toggleHeightSync(true); },
    disable: function() { toggleHeightSync(false); },
    toggle: function() { 
      ENABLE_HEIGHT_SYNC = !ENABLE_HEIGHT_SYNC;
      toggleHeightSync(ENABLE_HEIGHT_SYNC);
    },
    reset: resetHeights,
    sync: syncAllHeights
  };

  // Optional: Add CSS class to body to indicate script status
  $('body').addClass(shouldRunScript() ? 'height-sync-active' : 'height-sync-inactive');
});

$(document).ready(function(){
  $('.other-services_main').owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 1
      },
      992: {
        items: 2
      }
    }
  });
});

const toggleBtn = document.getElementById("toggleServices");
  const listItems = document.querySelectorAll("#serviceList li");

  toggleBtn.addEventListener("click", () => {
    const isExpanded = toggleBtn.textContent === "Show Less";

    listItems.forEach((item, index) => {
      if (index >= 6) {
        item.style.display = isExpanded ? "none" : "list-item";
      }
    });

    toggleBtn.textContent = isExpanded ? "Load More" : "Show Less";
  });
  const langBtn = document.getElementById("toggleLanguages");
  const langItems = document.querySelectorAll("#languageList li");

  langBtn.addEventListener("click", () => {
    const isExpanded = langBtn.textContent === "Show Less";

    langItems.forEach((item, index) => {
      if (index >= 6) {
        item.style.display = isExpanded ? "none" : "list-item";
      }
    });

    langBtn.textContent = isExpanded ? "Load More" : "Show Less";
  });
