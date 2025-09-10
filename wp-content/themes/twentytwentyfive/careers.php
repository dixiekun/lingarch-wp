<?php
/* Template Name: careers page */

get_header(); 
?>

  <section class="banner-video-section about-us-banner">
    <div class="banner_img">
      <img class="destop_img" src="image/about-us-banner.png" alt="">
      <img class="mobile_img" src="image/about-us-banner-mob.png" alt="">
    </div>
    <div class="banner_video_main">

      <!-- Banner 1 -->
      <h3>
        Join the LingArch Team

      </h3>

      <p>LingArch offers dream translator jobs, as well as careers for project managers, account managers and more. If you can't see a specific translator job below that you'd like to apply for, please contact us anyway using the form below to introduce yourself and attach your CV.</p>
      <div class="banner_conent">
        <div class="get_btn">
            <a class="btn-contact" href="#" data-bs-toggle="modal" data-bs-target="#enquiry-form" role="button" aria-controls="enquiry-form">Get a Bespoke Quote</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Form section  service -->
<section class="contact-us-section-service">
  <div class="container">
    <div class="form_div_main ">
      <p class="small-title">Get Started</p>
      <h2 class="main-title">Get in touch with us.<br> We're here to assist you.</h2>
    </div>
    <?php echo do_shortcode('[contact-form-7 id="13f7be8" title="careers"]'); ?>
  </div>
</section>
<!-- Form section  service -->

<?php get_footer(); ?>