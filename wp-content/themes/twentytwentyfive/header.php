<!DOCTYPE html>
<html lang="en">

<head>
  <title><?php echo get_post_meta( get_the_ID(), '_yoast_wpseo_title', true); ?></title>
  <meta name="description" content="<?php echo get_post_meta( get_the_ID(), '_yoast_wpseo_metadesc', true); ?>" />
  <link rel="canonical" href="<?php echo esc_url( get_permalink() ); ?>" />
  <meta name="keywords" content="" />
  <meta name="robots" content="noindex, nofollow">

  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?php wp_head(); ?>
  <!-- Required css -->
  <!-- Font Awesome CDN -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" integrity="sha512-...==" crossorigin="anonymous" referrerpolicy="no-referrer" />

  <link rel="stylesheet" type="text/css" href="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/css/bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/css/owl.carousel.min.css">
  <link rel="stylesheet" type="text/css" href="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/css/owl.theme.min.css">
  <!-- custom css  -->
  <link rel="stylesheet" type="text/css" href="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/css/style.css">
  <!-- Favicon (SVG preferred for modern browsers) -->
  <link rel="icon" href="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/image/favicon-32x32.png" type="image/svg+xml" />

  <!-- PNG Favicons -->
  <link rel="icon" href="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/image/favicon-32x32.png" sizes="32x32" type="image/png" />
  <link rel="icon" href="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/image/favicon-16x16.png" sizes="16x16" type="image/png" />
  <link rel="icon" href="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/image/android-chrome-192x192.png" sizes="192x192" type="image/png" />
  <link rel="icon" href="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/image/android-chrome-512x512.png" sizes="512x512" type="image/png" />

  <!-- ICO fallback for older browsers -->
  <link rel="icon" href="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/image/favicon-48x48.png" sizes="48x48" type="image/x-icon" />

  <!-- Apple Touch Icon -->
  <link rel="apple-touch-icon" href="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/image/favicon.ico" />

</head>

<body>
  <header>
    <!-- NAV_BAR_SECTION START -->
    <nav class="lingarch-header">
      <input type="checkbox" id="nav-toggle" autocompleted="">
      <div class="logo">
        <a href="/"><img src="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/image/lingarch-logo.png" alt="lingarch-Logo" title="lingarch-Logo"></a>
      </div>
      <div class="class_icon">
        <a href="tel:+442080047800"><img src="/wp-content/uploads/2025/08/system-regular-58-call-phone-hover-phone-ring.gif" alt=""></a>
      </div>
      <ul class="links">
        <li><a href="/about/">About us</a></li>

        <li class="dropdown-parent mega-menu desktop-menu">
          <a href="#">Services <span class="fa-solid fa-chevron-down"></span></a>
          <div class="mega-content">
            <div class="mega-box">
              <div class="mega-item">
                <img src="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/image/menu-icon/document-translation.png" alt="">
                <div class="mega_under">
                  <h4><a href="/document-translation-services/">Document translation</a></h4>
                  <p><a href="/legal-translation-services/">Legal Translation services</a></p>
                  <p><a href="/medical-translation-services/">Medical  Translation Services</a></p>
                </div>
              </div>
              <div class="mega-item">
                <img src="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/image/menu-icon/transcription-services.png" alt="">
                <div class="mega_under">
                  <h4><a href="/transcription-services/">Transcription services</a></h4>
                  <p><a href="/medical-transcription-services/">Medical Transcription Services</a></p>
                  <p><a href="/legal-transcription-services/">Legal transcription Services</a></p>
                </div>
              </div>
              <div class="mega-item">
                <img src="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/image/menu-icon/interpretation-service-uk.png" alt="">
                <div class="mega_under">
                  <h4><a href="/interpretation-services/">Interpretation service UK</a></h4>
                  <p><a href="/simultaneous-interpretation-services/">Simultaneous Interpretation Services</a></p>
                  <p><a href="/consecutive-interpretation-services/">Consecutive Interpretation Services</a></p>
                  <p><a href="/medical-interpretation-services/">Medical Interpretation Services</a></p>
                </div>
              </div>
              <div class="mega-item">
                <img src="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/image/menu-icon/deposition-service.png" alt="">
                <div class="mega_under">
                  <h4><a href="/deposition-services/">Deposition service</a></h4>
                  <p><a href="/deposition-services/">Deposition Services</a></p>
                  <p><a href="/deposition-videographer-services/">Deposition Videograpghy Services</a></p>
                </div>
              </div>

              <div class="mega-item">
                <img src="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/image/menu-icon/court-reporting.png" alt="">
                <div class="mega_under">
                  <h4><a href="/voice-over-services/">Voice Over Services</a></h4>
                  <p><a href="/voice-over-services-for-commercials/">Voice Over Services for commercial</a></p>
                  <p><a href="/voice-overs-for-e-learning/">Voice Over Services for e-learning</a></p>
                  <p><a href="/documentary-voice-over-services/">Proffessional Documentory Voice over services</a></p>
                </div>
              </div>
              <div class="mega-item">
                <img src="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/image/menu-icon/litigation-support.png" alt="">
                <div class="mega_under">
                  <h4><a href="#">Other Services</a></h4>
                  <p><a href="/subtitling-services/">Subtitling Services</a></p>
                  <p><a href="/clinical-trial-translation/">Clinical Trial Services</a></p>
                  <p><a href="/court-reporting/">Court Reporting Services</a></p>
                  <p><a href="/localisation-services/">Localisation Services</a></p>
                  <p><a href="/litigation-support-services/">Litigation Support Services in UK</a></p>
                  <!-- <p><a href="#">Language Translation Services</a></p> -->
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="dropdown-parent simple-menu mobile-menu">
          <a href="#">Services <span class="fa-solid fa-chevron-down"></span></a>
          <ul class="dropdown-list">
            <li class="main-service"><a href="/document-translation-services/">Document translation</a></li>
            <li class="sub-service"><a href="/legal-translation-services/">Legal Translation services</a></li>
            <li class="sub-service"><a href="/machine-translation-services/">Machine Translation Services</a></li>

            <li class="main-service"><a href="/transcription-services/">Transcription services</a></li>
            <li class="sub-service"><a href="/medical-transcription-services/">Medical Transcription Services</a></li>
            <li class="sub-service"><a href="/legal-transcription-services/">Legal transcription Services</a></li>

            <li class="main-service"><a href="/interpretation-services/">Interpretation service UK</a></li>
            <li class="sub-service"><a href="/simultaneous-interpretation-services/">Simultaneous Interpretation Services</a></li>
            <li class="sub-service"><a href="/consecutive-interpretation-services/">Consecutive Interpretation Services</a></li>
            <li class="sub-service"><a href="/medical-interpretation-services/">Medical Interpretation Services</a></li>

            <li class="main-service"><a href="/deposition-services/">Deposition service</a></li>
            <li class="sub-service"><a href="/deposition-services/">Deposition Services</a></li>
            <li class="sub-service"><a href="/deposition-videographer-services/">Deposition Videograpghy Services</a></li>

            <li class="main-service"><a href="/voice-over-services/">Voice Over Services</a></li>
            <li class="sub-service"><a href="/voice-over-services-for-commercials/">Voice Over Services for commercial</a></li>
            <li class="sub-service"><a href="/voice-overs-for-e-learning/">Voice Over Services for e-learning</a></li>
            <li class="sub-service"><a href="/documentary-voice-over-services/">Proffessional Documentory Voice over services</a></li>

            <li><a href="/subtitling-services/">Subtitling Services</a></li>
            <li><a href="/clinical-trial-translation/">Clinical Trial Services</a></li>
            <li><a href="/court-reporting/">Court Reporting Services</a></li>
            <li><a href="/localisation-services/">Localisation Services</a></li>
            <li><a href="/litigation-support-services/">Litigation Support Services in UK</a></li>
          </ul>
        </li>
        <li class="dropdown-parent simple-menu">
          <a href="#">Industries <span class="fa-solid fa-chevron-down"></span></a>
          <ul class="dropdown-list">
            <li><a href="/legal-translation-services/">Legal</a></li>
            <li><a href="/travel-hospitality-translation-services/">Travel & Hospitality</a></li>
            <li><a href="/pharmaceutical-translation-services/">Life Sciences (Pharmaceutical)</a></li>
            <li><a href="/medical-translation-services/">Medical Translations</a></li>
            <li><a href="/government-translation-services/">Government</a></li>
            <li><a href="/retail-ecommerce-translation/">Retail & Ecommerce</a></li>
          </ul>
        </li>



        <li><a href="#" data-bs-toggle="modal" data-bs-target="#price-form" role="button" aria-controls="price-form">Pricing</a></li>
        <li class="dropdown-parent simple-menu">
          <a href="#">Resources <span class="fa-solid fa-chevron-down"></span></a>
          <ul class="dropdown-list">
            <li><a href="/blog/">Blog</a></li>
            <li><a href="/case-studies/">Case Studies</a></li>
          </ul>
        </li>
        <li><a href="/contact/">Contact Us</a></li>
        <li>
          <a href="tel:+442080047800">
            <img src="/wp-content/uploads/2025/08/system-regular-58-call-phone-hover-phone-ring.gif" alt="Call">
          </a>
        </li>

        <li><?php echo lingarch_cta_button('Schedule a Meeting', '#enquiry-form', 'default'); ?></li>
      </ul>


      <label for="nav-toggle" class="icon-burger">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </label>
    </nav>
  </header>
  <!-- Header Section -->