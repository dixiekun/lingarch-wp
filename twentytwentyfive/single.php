<?php

get_header(); 

?><section class="blogbanner-detail py-0">
  <div class="blog-mainbanner">
    <div class="banner-blogimg">
      <img src="<?php echo get_the_post_thumbnail_url(get_the_ID(), 'full'); ?>"  alt="<?php echo esc_attr(get_the_title()); ?>" 
  title="<?php echo esc_attr(get_the_title()); ?>" >
    </div>
  </div>
</section>
<section class="blog-detail">
  <div class="container">
    <div class="blog-detailmain">
      <div class="bloginner-cont">
        <div class="posted-date">
          <div class="icon">
            <img src="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/image/menu-icon/time-post.png" alt="Calendar Icon" />
          </div>
          <span>Posted on <?php echo get_the_date('d M, Y'); ?></span>
        </div>

        <h1><?php the_title(); ?></h1>
        <?php the_content(); ?>
      </div>
      <div class="detial-social">
        <div class="admin_blog">
    <img src="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/image/menu-icon/admin.png" alt="Admin">
    <p>By Lingarch</p>
</div>

        <div class="social-blogshare">
          <p>Share this:</p>
          <a href="https://www.instagram.com/" target="_blank">
            <img src="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/image/menu-icon/Instagram.png" alt="Instagram">
          </a>

          <a href="https://twitter.com/intent/tweet?url=<?php echo urlencode(get_permalink()); ?>&text=<?php echo urlencode(get_the_title()); ?>" target="_blank">
            <img src="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/image/menu-icon/x.png" alt="Twitter">
          </a>

          <a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo urlencode(get_permalink()); ?>&title=<?php echo urlencode(get_the_title()); ?>" target="_blank">
            <img src="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/image/menu-icon/facebook.png" alt="Facebook">
          </a>

          <a href="https://www.linkedin.com/shareArticle?mini=true&url=<?php echo urlencode(get_permalink()); ?>&title=<?php echo urlencode(get_the_title()); ?>&source=<?php echo urlencode(get_permalink()); ?>" target="_blank">
            <img src="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/image/menu-icon/linked-in.png" alt="LinkedIn">
          </a>
        </div>
      </div>
    </div>

  </div>
</section>
 <!-- Latest Blogs -->
 <section class="latest_blog_section new_latest_blog">
  <div class="container">
 <h2 class="section-heading" style="text-align: center;">Latest Blogs</h2>

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

        <div class="sub_div_new">
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