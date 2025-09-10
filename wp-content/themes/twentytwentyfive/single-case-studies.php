<?php

get_header(); 

?>
<!-- banner Section Start -->
  <section class="banner-video-section about-us-banner case_detail">
    <div class="banner_img">
      <img class="destop_img" src="<?php echo esc_url(wp_get_attachment_url(get_post_meta(get_the_ID(), 'case_banner_des', true))); ?>" alt="">
      <img class="mobile_img" src="<?php echo esc_url(wp_get_attachment_url(get_post_meta(get_the_ID(), 'case_banner_mob', true))); ?>" alt="">
    </div>
    <div class="banner_video_main">
    
      <!-- Banner 1 -->
      <h3>
        <?php echo esc_html(get_post_meta(get_the_ID(), 'banner_title_case', true)); ?>
      </h3>

      <p><?php echo esc_html(get_post_meta(get_the_ID(), 'banner_title_para', true)); ?></p>
        <div class="get_btn">
        <a href="#" data-bs-toggle="modal" data-bs-target="#enquiry-form" role="button" aria-controls="enquiry-form">
           Get a Bespoke Quote
          </a>
      </div>
    </div>
  </section>
<!-- The Client -->
<section class="intro_section case_intro">
  <div class="container">
    <h2 class="section-heading"><?php echo get_post_meta(get_the_ID(), 'the_client_title', true); ?></h2>
    <p><?php echo get_post_meta(get_the_ID(), 'the_client_para-1', true); ?> </p>
    <p>
      <?php echo get_post_meta(get_the_ID(), 'the_client_para-2', true); ?></p>

  </div>

</section>
<!-- The Client -->
<!-- the challenge Section -->
<section class="challeng_section">
  <div class="container">
    <div class="challenge-line">
      <div class="first_div_challenge">
        <h3 class="section-heading"><?php echo get_post_meta(get_the_ID(), 'the_challenge_title', true); ?></h3>
        <p><?php echo get_post_meta(get_the_ID(), 'the_challenge_para-1', true); ?></p>
        <p>
          <?php echo get_post_meta(get_the_ID(), 'the_challenge_para-2', true); ?></p>

      </div>
      <div class="first_div_challenge">
        <h3 class="section-heading"><?php echo get_post_meta(get_the_ID(), 'the_solution_title', true); ?></h3>
        <p><?php echo get_post_meta(get_the_ID(), 'the_solution_para_1', true); ?></p>
        <p>
          <?php echo get_post_meta(get_the_ID(), 'the_solution_para_2', true); ?></p>
      </div>
    </div>
  </div>
</section>

<!-- the challenge Section -->

<!-- Need Language Support section -->
<section class="need_support_section destop_need">
  <div class="container">
    <div class="need_support_main">
      <div class="need_support_img">
        <img src="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/image/contact-background.png" alt="">
      </div>
      <div class="need_support_div">
        <h3>Need Language Support?</h3>
        <p>Breaking language barriers with expert translation and interpretation services in 120+ languages, 24/7.</p>
        <div class="get_quote">
          <a href="#" data-bs-toggle="modal" data-bs-target="#enquiry-form" role="button" aria-controls="enquiry-form">Get Free Quote</a>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="need_sup Mobile_need">
  <div class="container">
    <div class="need_support_div_mob">
      <h3>Need Language Support?</h3>
      <p>Breaking language barriers with expert translation and interpretation services in 120+ languages, 24/7.</p>
      <div class="get_quote_mob">
        <a href="#" data-bs-toggle="modal" data-bs-target="#enquiry-form" role="button" aria-controls="enquiry-form">Get Free Quote</a>
      </div>
    </div>
  </div>
</section>
<!-- Need Language Support section -->
<?php get_footer(); ?>