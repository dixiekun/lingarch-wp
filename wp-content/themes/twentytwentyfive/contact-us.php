<?php
/* Template Name: Contact page */

get_header(); 

?>
<!-- Form Section start -->
<section class="home_form_section">
  <div class="container">
    <div class="form_sectin_main_div row">
      <div class="form_conent col-lg-6">
        <div class="section-kicker">
          <span><?php echo get_post_meta(get_the_ID(), 'contact_title_small', true) ?: 'Get Started'; ?></span>
        </div>
        <h3><?php echo get_post_meta(get_the_ID(), 'contact_title_big', true) ?: 'Get in touch with us. We\'re here to assist you.'; ?></h3>
        <p>Ready to break down language barriers? Contact our expert team for professional translation services tailored to your industry needs.</p>
        <p>Get your personalized quote within 24 hours and experience the LingArch difference.</p>
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

<!-- Contact Info section -->
<section class="contact_info_section">
  <div class="container">
    <div class="contact_info_main row">
      <div class="contact_frs_conent col-lg-6">
        <h5> <?php echo get_post_meta(get_the_ID(), 'contact_small_text', true); ?></h5>
        <h2> <?php echo get_post_meta(get_the_ID(), 'contact_big_text', true); ?></h2>
      </div>
      <div class="contact_info_sub  col-lg-6">
        <div class="email_div ">
          <img src="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/image/menu-icon/email-icon.png " alt="Email Icon">
          <h5>Email Address</h5>
          <a href="tel:+442080047800">+44 (0)2080047 800</a>
        </div>
        <div class="location-cont  ">
          <img src="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/image/menu-icon/location-icon.png" alt="Location Icon">
          <h5>Location</h5>
          <p>34 Fenchurch St, London,<br>EC3M 4AJ, United Kingdom</p>
        </div>
      </div>
    </div>
  </div>
</section>

 <!-- Contact Info section -->
  
  <!-- Global Offices, Local Expertise  -->
  <section class="global_office_section">
    <div class="container">
      <h2 class="section-heading"><?php echo get_post_meta(get_the_ID(), 'global_title_text', true); ?></h2>
      <div class="map-container">
        <img src="<?php echo wp_get_attachment_url(get_post_meta(get_the_ID(), 'map_image', true)); ?>" alt="" />

        <div class="location location-chicago">
          <div class="pin-1"></div>
          <div class="show_conent">
            <h5>Chicago</h5>
          </div>
          <div class="tooltip">
            <a href="mailto:birmingham@lingarch.com">
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
            <a href="mailto:birmingham@lingarch.com">
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
            <a href="https://maps.app.goo.gl/QdRDU4oWhX6Kacey8">
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
            <a href="mailto:birmingham@lingarch.com">
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
            <a href="mailto:birmingham@lingarch.com">
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
            <a href="mailto:birmingham@lingarch.com">
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
            <a href="mailto:birmingham@lingarch.com">
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
            <a href="mailto:birmingham@lingarch.com">
              <h5>Hong Kong</h5>
              <p>Central, HK Island</p>
            </a>
          </div>
        </div>
      </div>


    </div>

  </section>
  <!-- Global Offices, Local Expertise -->
  <?php get_footer(); ?>