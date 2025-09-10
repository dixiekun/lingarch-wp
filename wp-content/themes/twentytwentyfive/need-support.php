  <!-- Need Language Support section -->
  <section class="need_support_section destop_need">
    <div class="container">
      <div class="need_support_main">
        <div class="need_support_img">
          <img src="<?php echo wp_get_attachment_url(get_post_meta(get_the_ID(), 'contact_background', true)); ?>" alt="<?php echo $desktop_image['alt']; ?>">
        </div>
        <div class="need_support_div">
          <h3><?php echo get_post_meta(get_the_ID(), 'need_support_title', true); ?></h3>
          <p><?php echo get_post_meta(get_the_ID(), 'need_support_para', true); ?></p>
          <div class="get_quote_mob">
             <a href="" data-bs-toggle="modal" data-bs-target="#enquiry-form" role="button" aria-controls="enquiry-form">
          Get Free Quote            
          </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="need_sup Mobile_need">
    <div class="container">
      <div class="need_support_div_mob">
        <h3> <?php echo get_post_meta(get_the_ID(), 'need_support_title', true); ?></h3>
        <p><?php echo get_post_meta(get_the_ID(), 'need_support_para', true); ?></p>
        <?php 
?>

        <?php if ($quote_link): ?>
        <div class="get_quote_mob">
          <a href="" data-bs-toggle="modal" data-bs-target="#enquiry-form" role="button" aria-controls="enquiry-form">
          Get Free Quote            
          </a>
        </div>
        <?php endif; ?>

      </div>
    </div>
  </section>
  <!-- Need Language Support section -->