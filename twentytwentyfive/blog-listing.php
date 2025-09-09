<?php
/* Template Name: Blog listing page */

get_header(); 
?>
<!-- Hero Section Start - Blog Page -->
<section class="hero-section service-hero">
  <div class="hero-content">
    <div class="hero-header">
      <div class="hero-tagline">
        <div class="service-featured-image">
          <img src="<?php echo wp_get_attachment_url(get_post_meta(get_the_ID(), 'blog_listing_des_image', true)); ?>" alt="">
        </div>
        <span>Latest Insights & Updates</span>
      </div>
      
      <h1 class="hero-title">
        <?php echo get_post_meta(get_the_ID(), 'blog_listing_title', true); ?>
      </h1>
    </div>
    
    <div class="hero-description">
      <p><?php echo get_post_meta(get_the_ID(), 'blog_listing_para', true); ?></p>
    </div>
  </div>
</section>
<!-- Hero Section End -->

<!-- Featured Blog Section -->
<section class="featured_blog_section">
  <div class="container">
    <div class="owl-carousel owl-theme featured_blog_main">
      <?php
      $args2 = array(
        'numberposts' => 5, // Limit to 5 posts
        'post_type'   => 'post',
        'order'       => 'DESC',
        'orderby'     => 'date',
      );
      $all_blog = get_posts($args2);

      foreach ($all_blog as $all_posts) {
      ?>
        <div class="item row">
          <div class="featured_sub_img col-lg-6">
            <a href="<?php echo get_the_permalink($all_posts->ID); ?>">
              <img src="<?php echo get_the_post_thumbnail_url($all_posts->ID, 'full'); ?>" alt="">
            </a>
          </div>
          <div class="featured_sub_conent col-lg-6">
            <h2><?php echo $all_posts->post_title; ?></h2>
            <p><?php echo wp_trim_words($all_posts->post_content, 30, '...'); ?></p>
            <div class="read_more_btn">
              <a href="<?php echo get_the_permalink($all_posts->ID); ?>">Read More <i class="fa-solid fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
      <?php } ?>
    </div>
  </div>
</section>
<!-- Featured Blog Section End -->

<!-- Blog Listing Section -->
<section class="blog_grid_section">
  <div class="container blog-listing-con">
    <div class="blog_section_main_div">
      <?php
      $args2 = array(
        'numberposts' => -1,
        'post_type'   => 'post',
        'order'       => 'DESC',
        'orderby'     => 'date',
      );
      $all_blog = get_posts($args2);

      foreach ($all_blog as $all_posts) {
        $blog_month = get_the_date('M', $all_posts->ID);
        $blog_year = get_the_date('Y', $all_posts->ID);
        $author_name = get_the_author_meta('display_name', $all_posts->post_author);
        $short_excerpt = wp_trim_words($all_posts->post_content, 15, '...');
      ?>
        <div class="div_blog_list">
          <div class="blog-card-new">
            <a href="<?php echo get_the_permalink($all_posts->ID); ?>" class="blog-link-new">
              <div class="blog-card-inner">
                
                <!-- Background Image -->
                <?php if (get_the_post_thumbnail_url($all_posts->ID, 'large')) : ?>
                  <div class="blog-bg" style="background-image: url('<?php echo get_the_post_thumbnail_url($all_posts->ID, 'large'); ?>');"></div>
                <?php else : ?>
                  <div class="blog-bg"></div>
                <?php endif; ?>
                
                <!-- Dark Gradient Overlay -->
                <div class="blog-gradient-overlay"></div>
                
                <!-- White Overlay with Content -->
                <div class="blog-overlay">
                  <div class="blog-info">
                    <h3 class="blog-title-new"><?php echo $all_posts->post_title; ?></h3>
                    <?php if ($short_excerpt) : ?>
                      <p class="blog-excerpt"><?php echo esc_html($short_excerpt); ?></p>
                    <?php endif; ?>
                  </div>
                </div>
                
                <!-- Footer with Author and Date (stays fixed) -->
                <div class="blog-footer-fixed">
                  <div class="blog-author">By <?php echo esc_html($author_name); ?></div>
                  <div class="blog-date">
                    <div class="blog-month"><?php echo esc_html($blog_month); ?></div>
                    <div class="blog-year"><?php echo esc_html($blog_year); ?></div>
                  </div>
                </div>
                
              </div>
            </a>
          </div>
        </div>
      <?php } ?>
    </div>
    <div id="pagination-container"></div>
  </div>
</section>
<!-- Blog Listing Section End -->

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
      <h3>Need Language Support?</h3>
      <p>Breaking language barriers with expert translation and interpretation services in 120+ languages, 24/7.</p>
      <div class="get_quote_mob">
        <a href="" data-bs-toggle="modal" data-bs-target="#enquiry-form" role="button" aria-controls="enquiry-form">
          Get Free Quote
        </a>
      </div>
    </div>
  </div>
</section>
<!-- Need Language Support section End -->

<?php get_footer(); ?>
