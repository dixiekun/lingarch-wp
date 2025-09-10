<?php
/* Template Name: Case Study listing page */

get_header(); 

?>

<!-- Hero Section Start - Case Studies Page -->
<section class="hero-section service-hero">
  <div class="hero-content">
    <div class="hero-header">
      <div class="hero-tagline">
        <div class="service-featured-image">
          <img src="<?php echo site_url(); ?>/wp-content/uploads/2025/08/machine-translation-services-4.png" alt="">
        </div>
        <span>Real Client Success Stories</span>
      </div>
      
      <h1 class="hero-title">
        LingArch = Results Through Language Services
      </h1>
    </div>
    
    <div class="hero-description">
      <p>Over the years we have helped many businesses in a wide variety of industries to overcome tight deadlines, process a high number of transactions and grow their teams internationally, all remotely via our tried-and-tested, highly confidential methods.</p>
    </div>
  </div>
</section>
<!-- Hero Section End -->
<!-- Case Studies Section -->
<section class="case-studies-new">
  <div class="case-studies-container">
    
    <!-- Section Header -->
    <div class="section-header-border">
      <h2 class="section-kicker">Case studies</h2>
    </div>
    
    <!-- Case Studies Content -->
    <div class="case-studies-content">
      <!-- Case Studies Grid -->
      <div class="case-studies-grid-listing">
        <?php
        $args = array(
          'post_type' => 'case-studies',
          'posts_per_page' => -1,
          'orderby' => 'date',
          'order' => 'DESC'
        );
        $case_studies = new WP_Query($args);

        if ($case_studies->have_posts()) :
          $case_counter = 1;
          while ($case_studies->have_posts()) : $case_studies->the_post(); 
            $case_number = sprintf('%02d', $case_counter);
            $case_month = get_post_meta(get_the_ID(), 'case_month', true) ?: get_the_date('M');
            $case_year = get_post_meta(get_the_ID(), 'case_year', true) ?: get_the_date('Y');
            ?>
          
          <div class="case-card">
            <a href="<?php the_permalink(); ?>" class="case-link">
              <div class="case-card-inner">
                
                <!-- Background Image -->
                <?php if (has_post_thumbnail()) : ?>
                  <div class="case-bg" style="background-image: url('<?php the_post_thumbnail_url('large'); ?>');"></div>
                <?php else : ?>
                  <div class="case-bg"></div>
                <?php endif; ?>
                
                <!-- Dark Gradient Overlay -->
                <div class="case-gradient-overlay"></div>
                
                <!-- White Overlay with Content -->
                <div class="case-overlay">
                  <div class="case-info">
                    <h3 class="case-title"><?php the_title(); ?></h3>
                  </div>
                </div>
                
                <!-- Footer with Number and Date (stays fixed) -->
                <div class="case-footer-fixed">
                  <div class="case-number"><?php echo esc_html($case_number); ?></div>
                  <div class="case-date">
                    <div class="case-month"><?php echo esc_html($case_month); ?></div>
                    <div class="case-year"><?php echo esc_html($case_year); ?></div>
                  </div>
                </div>
                
                <!-- Description Content (appears on hover) -->
                <div class="case-content">
                  <div class="case-description">
                    <p><?php echo wp_trim_words(get_the_excerpt(), 25, '...'); ?></p>
                  </div>
                </div>
              </div>
            </a>
          </div>
          
          <?php 
            $case_counter++;
          endwhile;
          wp_reset_postdata();
        else : ?>
          
          <!-- Fallback case studies if no posts exist -->
          <div class="case-card">
            <div class="case-card-inner">
              <div class="case-bg"></div>
              
              <!-- Dark Gradient Overlay -->
              <div class="case-gradient-overlay"></div>
              
              <!-- White Overlay with Content -->
              <div class="case-overlay">
                <div class="case-info">
                  <h3 class="case-title">FMCG Brand Packaging</h3>
                </div>
              </div>
              
              <!-- Footer with Number and Date (stays fixed) -->
              <div class="case-footer-fixed">
                <div class="case-number">01</div>
                <div class="case-date">
                  <div class="case-month">Aug</div>
                  <div class="case-year">2025</div>
                </div>
              </div>
              
              <!-- Description Content (appears on hover) -->
              <div class="case-content">
                <div class="case-description">
                  <p>How we helped a major FMCG brand translate packaging copy for 15 international markets while maintaining brand voice and regulatory compliance.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="case-card">
            <div class="case-card-inner">
              <div class="case-bg"></div>
              
              <!-- Dark Gradient Overlay -->
              <div class="case-gradient-overlay"></div>
              
              <!-- White Overlay with Content -->
              <div class="case-overlay">
                <div class="case-info">
                  <h3 class="case-title">Law Firm's Tight Patent Deadline</h3>
                </div>
              </div>
              
              <!-- Footer with Number and Date (stays fixed) -->
              <div class="case-footer-fixed">
                <div class="case-number">02</div>
                <div class="case-date">
                  <div class="case-month">May</div>
                  <div class="case-year">2025</div>
                </div>
              </div>
              
              <!-- Description Content (appears on hover) -->
              <div class="case-content">
                <div class="case-description">
                  <p>Emergency patent translation for a London law firm facing a 48-hour filing deadline across multiple jurisdictions.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="case-card">
            <div class="case-card-inner">
              <div class="case-bg"></div>
              
              <!-- Dark Gradient Overlay -->
              <div class="case-gradient-overlay"></div>
              
              <!-- White Overlay with Content -->
              <div class="case-overlay">
                <div class="case-info">
                  <h3 class="case-title">Global Energy Company</h3>
                </div>
              </div>
              
              <!-- Footer with Number and Date (stays fixed) -->
              <div class="case-footer-fixed">
                <div class="case-number">03</div>
                <div class="case-date">
                  <div class="case-month">Apr</div>
                  <div class="case-year">2025</div>
                </div>
              </div>
              
              <!-- Description Content (appears on hover) -->
              <div class="case-content">
                <div class="case-description">
                  <p>Complex technical translation project for offshore energy operations, requiring specialized terminology and safety compliance.</p>
                </div>
              </div>
            </div>
          </div>
          
        <?php endif; ?>
      </div>
    </div>
  </div>
</section>
  <!-- case Study listing section -->

<!-- Need Language Support section -->
<section class="need_support_section destop_need">
  <div class="container">
    <div class="need_support_main">
      <div class="need_support_img">
        <img src="https://dev-staging.in/wp-content/uploads/2025/07/contact-background-2.png" alt="">
      </div>
      <div class="need_support_div">
        <h3>Need Language Support?</h3>
        <p>Breaking language barriers with expert translation and interpretation services in 120+ languages, 24/7.</p>
        <div class="get_quote">
          <a href="#" data-bs-toggle="modal" data-bs-target="#enquiry-form" role="button" aria-controls="enquiry-form">
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
<a href="#" data-bs-toggle="modal" data-bs-target="#enquiry-form" role="button" aria-controls="enquiry-form">
            Get Free Quote
          </a>
      </div>
    </div>
  </div>
</section>
<!-- Need Language Support section -->
<?php get_footer(); ?>