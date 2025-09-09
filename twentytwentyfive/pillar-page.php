<?php
/* Template Name: Pillar page */

get_header(); 

?>
<!-- banner Section Start -->
<section class="banner-video-section about-us-banner pillar-page">
  <div class="banner_img">

    <img class="destop_img" src="<?php echo wp_get_attachment_url(get_post_meta(get_the_ID(), 'pillar_image_dest', true)); ?>" alt="">
    <img class="mobile_img" src="<?php echo wp_get_attachment_url(get_post_meta(get_the_ID(), 'pillar_image_mob', true)); ?>" alt="">

  </div>
  <div class="banner_video_main">

    <!-- Banner 1 -->
    <h1 class="pillar_h1">
      <?php echo get_post_meta(get_the_ID(), 'pillar_banner_title', true); ?>
    </h1>

    <p><?php echo get_post_meta(get_the_ID(), 'pillar_banner_text', true); ?></p>
  </div>
</section>
<!-- banenr Section start -->
<!-- Introduction section -->
<section class="intro_section">
  <div class="container">
    <h2 class="section-heading"><?php echo get_post_meta(get_the_ID(), 'introduction_title', true); ?></h2>
    <p><?php echo get_post_meta(get_the_ID(), 'introduction_text', true); ?></p>

  </div>

</section>
<!-- Introduction section -->

<?php if (have_rows('pillar_sections')): ?>
<?php while (have_rows('pillar_sections')): the_row(); ?>
<section class="pillar-page_inner">
  <div class="container">
    <div class="main_div_pillar">

      <!-- Title -->
      <?php if ($title = get_sub_field('title')): ?>
      <h3><?php echo esc_html($title); ?></h3>
      <?php endif; ?>

      <!-- Content -->
      <?php if ($content = get_sub_field('content')): ?>
      <div><?php echo get_sub_field('content'); ?></div>
      <?php endif; ?>

      <!-- CTAs -->
      <div class="banner_conent_pilar">
        <?php 
    $cta_1 = get_sub_field('pillar_cta_1'); 
    $btn_1 = get_sub_field('title_btn_1'); 
  ?>
        <?php if (!empty($cta_1['url']) && $btn_1): ?>
        <div class="get_btn_pillar">
          <a href="<?php echo esc_url($cta_1['url']); ?>" target="_blank">
            <?php echo esc_html($btn_1); ?>
          </a>
        </div>
        <?php endif; ?>

        <?php 
    $cta_2 = get_sub_field('pillar_cta_2'); 
    $btn_2 = get_sub_field('title_btn_2'); 
  ?>
        <?php if (!empty($cta_2['url']) && $btn_2): ?>
        <div class="get_btn_pillar">
          <a href="<?php echo esc_url($cta_2['url']); ?>" target="_blank">
            <?php echo esc_html($btn_2); ?>
          </a>
        </div>
        <?php endif; ?>
      </div>

    </div>
  </div>
</section>
<?php endwhile; ?>
<?php endif; ?>
<!-- Introduction section -->
<section class="intro_section">
  <div class="container">
    <h2 class="section-heading"><?php echo get_post_meta(get_the_ID(), 'conclusion_title', true); ?></h2>
    <p><?php echo get_post_meta(get_the_ID(), 'conclusion_text', true); ?></p>

  </div>

</section>
<!-- Introduction section -->
 <section class="latest_blog_section">
  <div class="container">
 <h2 class="section-heading" style="text-align: center;">Latest Blogs</h2>
    </div>

    <div class="owl-carousel latest_main_div">
      <?php
        $latest_blogs = new WP_Query(array(
          'post_type' => 'post',
          'posts_per_page' => 4, // Change as needed
          'orderby' => 'date',
          'order' => 'DESC'
        ));

        if ($latest_blogs->have_posts()) :
          while ($latest_blogs->have_posts()) : $latest_blogs->the_post();
      ?>
      <div class="blog-card">
        <?php if (has_post_thumbnail()) : ?>
        <img src="<?php the_post_thumbnail_url('medium_large'); ?>" alt="<?php the_title_attribute(); ?>" class="blog-image" />
        <?php else : ?>
        <img src="<?php echo site_url(); ?>/wp-content/uploads/default-blog.png" alt="Default Blog Image" class="blog-image" />
        <?php endif; ?>

        <div class="blog-meta">
          <div class="inner_admin_1">
            <img src="<?php echo site_url(); ?>/wp-content/uploads/2025/07/admin.png" alt="">
            <p>By Lingarch</p>
          </div>
          <div class="inner_admin_2">
            <img src="<?php echo site_url(); ?>/wp-content/uploads/2025/07/calendar.png" alt="">
            <p><?php echo get_the_date('F j, Y'); ?></p>
          </div>
        </div>

        <h3 class="blog-title"><?php the_title(); ?></h3>

        <a href="<?php the_permalink(); ?>" class="blog-link">
          Know more <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
      <?php
          endwhile;
          wp_reset_postdata();
        else :
          echo '<p>No recent blogs found.</p>';
        endif;
      ?>
    </div>
  </div>
</section>

<!-- Latest Blogs -->
<!-- Need Language Support section -->

<?php include 'need-support.php';?>

<!-- Need Language Support section -->

<?php get_footer(); ?>