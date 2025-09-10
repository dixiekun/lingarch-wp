<?php
/* Template Name: Home page */

get_header(); 

?>
<!-- Hero Section Start - dixie designs -->
<section class="hero-section">
  <div class="hero-texture">
    <div class="texture-pattern"></div>
    <div class="hero-ellipse hero-ellipse-1"></div>
    <div class="hero-ellipse hero-ellipse-2"></div>
    <div class="hero-ellipse hero-ellipse-3"></div>
    <div class="hero-ellipse hero-ellipse-4"></div>
  </div>
  
  <div class="hero-content">
    <div class="hero-header">
      <div class="hero-tagline">
        <span>The Global Language Agency</span>
      </div>
      
      <h1 class="hero-title">
        We translate your documents accurately and on time.
      </h1>
    </div>
    
    <div class="hero-description">
      <p id="typewriter-text" aria-label="Professional translation services prevent costly mistakes in legal documents, medical translations, and business communications">
        <span class="typewriter-content"></span>
        <span class="typewriter-cursor">|</span>
      </p>
    </div>
    
    <div class="hero-buttons">
      <?php echo lingarch_cta_button('Schedule a Meeting', '#enquiry-form', 'default'); ?>
      
      <a href="#" class="btn-secondary" data-bs-toggle="modal" data-bs-target="#price-form" role="button" aria-controls="price-form">
        <span>Get your free quote.</span>
      </a>
    </div>
  </div>
</section>

<!-- Global Brands logos section -->
<?php include 'global-brand.php';?>
<!-- Global Brands logos section -->

<!-- Intro Section -->
<?php include 'intro-section.php';?>
<!-- Intro Section -->

<!-- New Case Studies Section -->
<?php include 'case-studies-section.php';?>
<!-- New Case Studies Section -->

<!-- banenr Section start -->
<!-- Industries we serve section -->
<?php include 'industries-we-serve-new.php';?>
<!-- Industries we serve section -->

<!-- Testimonials Section -->
<?php include 'testimonials-section.php';?>
<!-- Testimonials Section -->

<!-- FAQs Section -->
<?php include 'faqs-section.php';?>
<!-- FAQs Section -->

<!-- Form Section start -->
<section class="home_form_section">
  <div class="container">
    <div class="form_sectin_main_div row">
      <div class="form_conent col-lg-6">
        <div class="section-kicker">
          <span>Get Started</span>
        </div>
        <h3> <?php echo get_post_meta(get_the_ID(), 'form_section_title', true); ?></h3>
        <p>
          <?php echo get_post_meta(get_the_ID(), 'form_section_para_1', true); ?></p>
        <p><?php echo get_post_meta(get_the_ID(), 'form_section_para_2', true); ?></p>

      </div>
      <div class="form_div_main col-lg-6">
        <div class="info-form-container">
          <h2>Fill out the form to request information</h2>
         <?php echo do_shortcode('[contact-form-7 id="64f7d34" title="Request information"]'); ?>
        </div>

      </div>

    </div>

  </div>
</section>
<!-- Form Section end -->

<?php get_footer(); ?>