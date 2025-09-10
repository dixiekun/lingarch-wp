<?php
/* Template Name: About Us  page */

get_header(); 

?>
<!-- Hero Section Start - About Us -->
<section class="hero-section about-hero">
  <div class="hero-content">
    <div class="hero-header">
      <div class="hero-tagline">
        <div class="about-featured-image">
          <img src="<?php echo wp_get_attachment_url(get_post_meta(get_the_ID(), 'about_destop_image', true)); ?>" alt="">
        </div>
        <span>About LingArch</span>
      </div>
      
      <h1 class="hero-title">
        <?php echo get_post_meta(get_the_ID(), 'banner_title', true); ?>
      </h1>
    </div>
    
    <div class="hero-description">
      <p><?php echo get_post_meta(get_the_ID(), 'banner_para', true); ?></p>
    </div>
    
    <div class="hero-buttons">
      <?php echo lingarch_cta_button('Schedule a Meeting', '#enquiry-form', 'default'); ?>
      
      <?php 
      $explore_link = get_field('about_services_link'); 
      $explore_text = get_field('about_services_text'); 
      ?>
      <?php if ($explore_link): ?>
        <a href="<?php echo esc_url($explore_link['url']); ?>" class="btn-secondary" target="<?php echo esc_attr($explore_link['target']); ?>">
          <span><?php echo esc_html($explore_text); ?></span>
        </a>
      <?php endif; ?>
    </div>
  </div>
</section>

<!-- About Section -->
<section class="about-section-new">
  <div class="about-container">
    
    <!-- Section Header -->
    <div class="about-header">
      <div class="about-title-col">
        <h2 class="about-title"><?php echo get_post_meta(get_the_ID(), 'about_second_title', true); ?></h2>
      </div>
      <div class="about-description-col">
        <div class="about-description">
          <p><?php echo get_post_meta(get_the_ID(), 'about_second_para_1', true); ?></p>
          <p><?php echo get_post_meta(get_the_ID(), 'about_second_para_2', true); ?></p>
        </div>
      </div>
    </div>
    
    <!-- About Image -->
    <div class="about-image">
      <img src="<?php echo wp_get_attachment_url(get_post_meta(get_the_ID(), 'about_secound_image', true)); ?>" alt="About LingArch">
    </div>

  </div>
</section>
<!-- About Section -->

<!-- Global Brands logos section -->
<div class="about-global-brands">
  <?php include 'global-brand.php';?>
</div>
<!-- Global Brands logos section -->

<!-- Why Choose LingArch?  -->
<section class="why_choose_section_new">
  <div class="why-choose-container">
    
    <!-- Section Header -->
    <div class="why-choose-header">
      <div class="why-choose-title-col">
        <h2 class="why-choose-title"><?php echo get_post_meta(get_the_ID(), 'why_choose_title', true); ?></h2>
      </div>
      <div class="why-choose-description-col">
        <div class="why-choose-description">
          <p><?php echo get_post_meta(get_the_ID(), 'why_choose_para', true); ?></p>
        </div>
      </div>
    </div>
    
    <!-- Why Choose Cards -->
    <div class="why_choose_main">

        <?php if (have_rows('why_choose_loop')): ?>
        <?php $wc = 1;
    while (have_rows('why_choose_loop')): the_row();

        $why_choose_image = get_sub_field('why_choose_image'); 
        $why_choose_text = get_sub_field('why_choose_text'); 

        if ($why_choose_image): ?>
        <div class="why_choose_sub-1">
          <img src="<?php echo esc_url($why_choose_image['url']); ?>" alt="<?php echo esc_attr($why_choose_image['alt']); ?>">
          <?php if ($why_choose_text): ?>
          <p><?php echo esc_html($why_choose_text); ?></p>
          <?php endif; ?>
        </div>
        <?php endif; ?>

        <?php $wc++;
    endwhile; ?>
        <?php endif; ?>
      </div>
    
  </div>
</section>
<!-- Why Choose LingArch?  -->
<!-- Our Mission & Vision  -->
<section class="our_mission_section">
  <div class="mission-container">
    
    <!-- Section Header -->
    <div class="mission-header">
      <div class="mission-title-col">
        <h2 class="mission-title"><?php echo get_post_meta(get_the_ID(), 'our_mission_title', true); ?></h2>
      </div>
      <div class="mission-description-col">
        <div class="mission-description">
          <p><?php echo get_post_meta(get_the_ID(), 'our_mission_para-1', true); ?></p>
          <p><?php echo get_post_meta(get_the_ID(), 'our_mission_para-2', true); ?></p>
        </div>
      </div>
    </div>

        <div class="mission_div">
          <?php if (have_rows('our_mission_loop')): ?>
          <?php while (have_rows('our_mission_loop')): the_row();
              $our_mission_image = get_sub_field('our_mission_image');
              $our_mission_title = get_sub_field('our_mission_title');
              $our_mission_text  = get_sub_field('our_mission_text');
              if ($our_mission_image): ?>
          <div class="why_choose_sub-1">
            <?php if ($our_mission_image): ?>
            <img src="<?php echo esc_url($our_mission_image['url']); ?>" alt="<?php echo esc_attr($our_mission_image['alt']); ?>">
            <?php endif; ?>
            <?php if ($our_mission_title): ?>
            <h4><?php echo esc_html($our_mission_title); ?></h4>
            <?php endif; ?>
            <?php if ($our_mission_text): ?>
            <p><?php echo esc_html($our_mission_text); ?></p>
            <?php endif; ?>
          </div>
          <?php endif;
            endwhile; ?>
          <?php endif; ?>
        </div>
    
  </div>
</section>

<!-- Our Mission & Vision  -->
<!-- Industries we serve section -->
<?php include 'industries-we-serve-new.php';?>
<!-- Industries we serve section -->
<!-- Global Offices, Local Expertise  -->
<section class="global_office_section">
  <div class="container">
    <h2 class="section-heading"><?php echo get_post_meta(get_the_ID(), 'map_title', true); ?></h2>
    <div class="map-container">
      <img src="<?php echo wp_get_attachment_url(get_post_meta(get_the_ID(), 'map_image', true)); ?>" alt="" />

      <div class="location location-chicago">
        <div class="pin-1"></div>
        <div class="show_conent">
          <h5>Chicago</h5>
        </div>
        <div class="tooltip">
          <a href="">
            <h5>Chicago</h5>
            <p>Downtown Loop, IL 60601</p>
          </a>
        </div>
      </div>

      <div class="location location-nyc">
        <div class="pin-1"></div>
        <div class="show_conent">
          <h5>New York</h5>
        </div>
        <div class="tooltip">
          <a href="">
            <h5>New York</h5>
            <p>135 E 57th Street<br>New York NY 10022</p>
          </a>
        </div>
      </div>

      <div class="location location-london">
        <div class="pin-1"></div>
        <div class="show_conent">
          <h5>London</h5>
        </div>
        <div class="tooltip">
          <a href="">
            <h5>London</h5>
            <p>10 Downing Street, SW1A</p>
          </a>
        </div>
      </div>

      <div class="location location-birmingham">
        <div class="pin-1"></div>
        <div class="show_conent">
          <h5>Birmingham</h5>
        </div>
        <div class="tooltip">
          <a href="">
            <h5>Birmingham</h5>
            <p>Colmore Row, B3 3AG</p>
          </a>
        </div>
      </div>

      <div class="location location-manchester location-manchester-right">
        <div class="pin-1"></div>
        <div class="show_conent">
          <h5>Manchester</h5>
        </div>
        <div class="tooltip">
          <a href="">
            <h5>Manchester</h5>
            <p>Piccadilly, M1 2BN</p>
          </a>
        </div>
      </div>

      <div class="location location-barcelona">
        <div class="pin-1"></div>
        <div class="show_conent">
          <h5>Barcelona</h5>
        </div>
        <div class="tooltip">
          <a href="">
            <h5>Barcelona</h5>
            <p>Gran Via de les Corts, 08010</p>
          </a>
        </div>
      </div>

      <div class="location location-dubai location-dubai-right">
        <div class="pin-1"></div>
        <div class="show_conent">
          <h5>Dubai</h5>
        </div>
        <div class="tooltip">
          <a href="">
            <h5>Dubai</h5>
            <p>Sheikh Zayed Road</p>
          </a>
        </div>
      </div>

      <div class="location location-hk location-hk-right">
        <div class="pin-1"></div>
        <div class="show_conent">
          <h5>Hong Kong</h5>
        </div>
        <div class="tooltip">
          <a href="">
            <h5>Hong Kong</h5>
            <p>Central, HK Island</p>
          </a>
        </div>
      </div>
    </div>


  </div>

</section>
<!-- Global Offices, Local Expertise -->
<!-- Accreditations section -->
<section class="accreditations_section">
  <div class="accreditations-container">
    
    <!-- Section Header -->
    <div class="accreditations-header">
      <div class="accreditations-title-col">
        <h2 class="accreditations-title">Accreditations</h2>
        <!-- Accreditation Images -->
        <div class="accreditations-images">
          <img src="<?php echo wp_get_attachment_url(get_post_meta(get_the_ID(), 'iso_image', true)); ?>" alt="">
          <img src="<?php echo wp_get_attachment_url(get_post_meta(get_the_ID(), 'en_image', true)); ?>" alt="">
        </div>
      </div>
      <div class="accreditations-description-col">
        <div class="accreditations-description">
          <p>Excellence is not just our promise — it is independently verified. LingArch proudly holds:</p>
          <p><strong>ISO 9001:2008</strong> – Ensuring consistent quality, compliance with statutory requirements, and a commitment to continuous improvement.</p>
          <p><strong>EN 15038:2006</strong> – Europe's first formal standard for translation services, validating our accuracy, transparency, and professionalism in every project.</p>
          <p>These accreditations reflect our dedication to global quality benchmarks and reinforce the trust our clients place in us for every mission-critical translation.</p>
        </div>
      </div>
    </div>

  </div>
</section>
<!-- Accreditations Section -->

<!-- Need Language Support section -->
<?php include 'need-support.php';?>
<!-- Need Language Support section -->
<?php get_footer(); ?>