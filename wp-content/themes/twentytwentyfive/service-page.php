<?php
/* Template Name: Service page */

get_header(); 

?>
<!-- Hero Section Start - Service Page -->
<section class="hero-section service-hero">
  <div class="hero-content">
    <div class="hero-header">
      <div class="hero-tagline">
        <div class="service-featured-image">
          <img src="<?php echo wp_get_attachment_url(get_post_meta(get_the_ID(), 'service_destop_image', true)); ?>" alt="">
        </div>
        <span>Professional Translation Services</span>
      </div>
      
      <h1 class="hero-title">
        <?php echo get_post_meta(get_the_ID(), 'banner_title', true); ?>
      </h1>
    </div>
    
    <div class="hero-description">
      <p><?php echo get_post_meta(get_the_ID(), 'banner_text', true); ?></p>
    </div>
    
    <div class="hero-buttons">
      <?php echo lingarch_cta_button('Get a Bespoke Quote', '#enquiry-form', 'default'); ?>
      
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

<div class="brdcrmb" itemscope itemtype="http://schema.org/BreadcrumbList">
    <ul>
        <?php if( have_rows('breadcrumb_items') ): ?>
            <?php $position = 1; ?>
            <?php while( have_rows('breadcrumb_items') ): the_row(); 
                $title = get_sub_field('title');
                $url = get_sub_field('url');
            ?>
            <li class="brdcrm_blistin brdcrm_blistin_<?php echo $position; ?>" style="list-style:none;">
                <span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                    <a itemprop="item" href="<?php echo esc_url($url); ?>" aria-label="Breadcrumb link">
                        <span itemprop="name"><?php echo esc_html($title); ?></span>
                    </a>
                    <meta itemprop="position" content="<?php echo $position; ?>">
                </span>
            </li>
            <?php $position++; endwhile; ?>
        <?php endif; ?>
    </ul>
</div>

<!-- Breadcrumb Separator -->
<div class="breadcrumb-separator">
  <div class="separator-container">
    <div class="separator-line"></div>
  </div>
</div>

<!-- Service Introduction Section -->
<section class="service-intro-section">
  <div class="service-intro-container">
    
    <!-- Section Header -->
    <div class="service-intro-header">
      <div class="service-intro-title-col">
        <h2 class="service-intro-title"><?php echo get_post_meta(get_the_ID(), 'service_title_1', true); ?></h2>
      </div>
      <div class="service-intro-description-col">
        <div class="service-intro-description">
          <p><?php echo get_post_meta(get_the_ID(), 'service_text_1', true); ?></p>
          <p><?php echo get_post_meta(get_the_ID(), 'service_text_2', true); ?></p>
        </div>
      </div>
    </div>

  </div>
</section>

<!-- Service Second Point Section -->
<section class="service-second-point">
  <div class="intro-container">
    <div class="intro-content">
      <div class="intro-text">
        <div class="intro-header-group">
          <div class="intro-tagline" data-animate>
            <span>PROFESSIONAL EXPERTISE</span>
          </div>
          <h2 class="intro-title">
            <?php echo get_post_meta(get_the_ID(), 'service_title_2', true); ?>
          </h2>
        </div>
        
        <?php 
        $service_text_1 = trim(get_post_meta(get_the_ID(), 'service_text_new_1', true));
        if (!empty($service_text_1)): ?>
        <p class="section-description" data-animate>
          <?php echo wp_kses_post($service_text_1); ?>
        </p>
        <?php endif; ?>
        
        <?php 
        // Check for service list items
        $service_list = trim(get_post_meta(get_the_ID(), 'service_list_items', true));
        if (!empty($service_list)): ?>
        <ul class="service-list">
          <?php 
          $list_items = explode("\n", $service_list);
          foreach ($list_items as $item):
            $item = trim($item);
            if (!empty($item)): ?>
              <li><?php echo esc_html($item); ?></li>
            <?php endif;
          endforeach; ?>
        </ul>
        <?php endif; ?>
        
        <?php 
        $service_text_2 = trim(get_post_meta(get_the_ID(), 'service_text_new_2', true));
        if (!empty($service_text_2)): ?>
        <p class="section-description">
          <?php echo wp_kses_post($service_text_2); ?>
        </p>
        <?php endif; ?>
        
        <div class="intro-cta">
          <?php echo lingarch_cta_button('Get a Bespoke Quote', '#enquiry-form', 'default'); ?>
        </div>
      </div>
    </div>
    
    <!-- Service Image -->
    <?php 
    $service_image_2 = get_post_meta(get_the_ID(), 'service_destop_image', true);
    if (!empty($service_image_2)): ?>
    <div class="service-second-image">
      <img src="<?php echo wp_get_attachment_url($service_image_2); ?>" alt="">
    </div>
    <?php endif; ?>
  </div>
</section>
<!--service 1 Section  -->
<!-- Case Studies section -->
<?php
$legal_title = get_post_meta(get_the_ID(), 'legal_title', true);
$legal_text = get_post_meta(get_the_ID(), 'legal_text', true);
$has_studies = have_rows('legal_studies');

if ($legal_title || $legal_text || $has_studies):
?>
<section class="case_studies_section">
  <?php if ($legal_title): ?>
    <h2 class="section-heading"><?php echo esc_html($legal_title); ?></h2>
  <?php endif; ?>

  <?php if ($legal_text): ?>
    <p class="New_p"><?php echo esc_html($legal_text); ?></p>
  <?php endif; ?>

  <?php if ($has_studies): ?>
  <div class="owl-carousel case-carousel case_studies_section_new">
    <?php while (have_rows('legal_studies')): the_row(); ?>
    <div class="item case-study-card">
      <div class="case-card-content">
        <?php 
          $case_image = get_sub_field('case_image');
          $case_image_alt = get_sub_field('case_image_alt');
        ?>

        <?php if ($case_image): ?>
          <div class="case-thumbnail">
            <img src="<?php echo esc_url($case_image['url']); ?>" alt="<?php echo esc_attr($case_image_alt ? $case_image_alt : $case_image['alt']); ?>">
          </div>
        <?php endif; ?>

        <div class="case-main-content">
          <?php $case_title = get_sub_field('case_title'); ?>
          <?php if ($case_title): ?>
            <h3 class="case-title"><?php echo esc_html($case_title); ?></h3>
          <?php endif; ?>
        </div>

        <div class="case-description-hover">
          <?php $case_description = get_sub_field('case_description'); ?>
          <?php if ($case_description): ?>
            <p><?php echo esc_html($case_description); ?></p>
          <?php endif; ?>

          <?php 
            $explore_link = get_sub_field('case_services_link');
            $explore_text = get_sub_field('case_services_text');
          ?>

          <?php if ($explore_link && !empty($explore_link['url'])): ?>
            <a href="<?php echo esc_url($explore_link['url']); ?>" target="<?php echo esc_attr($explore_link['target'] ? $explore_link['target'] : '_self'); ?>">
              <?php echo esc_html($explore_text ? $explore_text : 'Learn More'); ?> →
            </a>
          <?php endif; ?>
        </div>
      </div>
    </div>
    <?php endwhile; ?>
  </div>
  <?php endif; ?>
</section>
<?php endif; ?>

<!-- Case Studies section -->
<!--service 4 Section  -->
<?php
$legal_documents_title = get_post_meta(get_the_ID(), 'legal_documents_title', true);
$legal_documents_description = get_post_meta(get_the_ID(), 'legal_documents_description', true);
$legal_documents_text = get_post_meta(get_the_ID(), 'legal_documents_text', true);
$has_documents = have_rows('legal_document_types');

if ($legal_documents_title || $legal_documents_description || $has_documents || $legal_documents_text):
?>
<section class="industry-services">
  <div class="industries-container">
    <!-- Section Header -->
    <div class="industries-header">
      <?php if ($legal_documents_title): ?>
        <h2 class="industries-title" data-animate><?php echo esc_html($legal_documents_title); ?></h2>
      <?php endif; ?>

      <?php if ($legal_documents_description): ?>
        <div class="industries-description" data-animate>
          <p><?php echo esc_html($legal_documents_description); ?></p>
        </div>
      <?php endif; ?>
    </div>
    
    <!-- Document Types List -->
    <?php if ($has_documents): ?>
    <div class="industries-list" data-animate>
      <?php while (have_rows('legal_document_types')): the_row(); ?>
        <?php 
        $document_title = get_sub_field('document_title');
        $document_summary = get_sub_field('document_summary');
        if ($document_title): ?>
          <div class="industry-item">
            <h3><?php echo esc_html($document_title); ?></h3>
            <?php if ($document_summary): ?>
              <p class="document-description"><?php echo esc_html($document_summary); ?></p>
            <?php endif; ?>
          </div>
        <?php endif; ?>
      <?php endwhile; ?>
    </div>
    <?php endif; ?>

    <?php if ($legal_documents_text): ?>
      <div class="industries-footer" data-animate>
        <p><?php echo esc_html($legal_documents_text); ?></p>
      </div>
    <?php endif; ?>
  </div>
</section>
<?php endif; ?>

<!--service 4 Section  -->
<!-- Industries we serve section -->
<?php
$title = get_post_meta(get_the_ID(), 'industries_section_title', true);
$desc = get_post_meta(get_the_ID(), 'industries_section_description', true);
$text1 = get_post_meta(get_the_ID(), 'industries_section_text_1', true);
$has_loop = have_rows('industries_loop');

if (($title || $desc) && ($has_loop || $text1)):
?>
<section class="industries-extra">
  <div class="industries-container">
    <!-- Section Header -->
    <div class="industries-header">
      <?php if ($title): ?>
        <h2 class="industries-title" data-animate><?php echo esc_html($title); ?></h2>
      <?php endif; ?>

      <?php if ($desc): ?>
        <div class="industries-description" data-animate>
          <p><?php echo esc_html($desc); ?></p>
        </div>
      <?php endif; ?>
    </div>
    
    <!-- Industries List -->
    <?php if ($has_loop): ?>
    <div class="industries-list" data-animate>
      <?php while (have_rows('industries_loop')): the_row(); ?>
        <?php 
        $industries_title = get_sub_field('industries_title');
        $industries_text = get_sub_field('industries_text');
        $industries_image = get_sub_field('industries_image');
        if ($industries_title): ?>
          <div class="industry-item">
            <?php if ($industries_image): ?>
              <div class="industry-image">
                <img src="<?php echo esc_url($industries_image['url']); ?>" alt="<?php echo esc_attr($industries_image['alt']); ?>">
              </div>
            <?php endif; ?>
            <h3><?php echo esc_html($industries_title); ?></h3>
            <?php if ($industries_text): ?>
              <p class="document-description"><?php echo esc_html($industries_text); ?></p>
            <?php endif; ?>
          </div>
        <?php endif; ?>
      <?php endwhile; ?>
    </div>
    <?php endif; ?>

    <?php if ($text1): ?>
      <div class="industries-footer" data-animate>
        <p><?php echo esc_html($text1); ?></p>
      </div>
    <?php endif; ?>
  </div>
</section>
<?php endif; ?>


<!-- Industries we serve section -->


<?php
$process_title = get_post_meta(get_the_ID(), 'process_title', true);
$process_text = get_post_meta(get_the_ID(), 'process_text', true);
$process_description = get_post_meta(get_the_ID(), 'process_description', true);
$has_steps = have_rows('steps_loop');

// Only show section if any field is filled
if ($process_title || $process_text || $has_steps || $process_description):
?>
<section class="process-section">
  <div class="container">
    <div class="process_section_main">
      <!-- Swiss Grid Header -->
      <div class="process-section-header">
        <div class="process-title-col">
          <?php if ($process_title): ?>
            <h2 class="section-heading"><?php echo esc_html($process_title); ?></h2>
          <?php endif; ?>
        </div>
        <div class="process-description-col">
          <?php if ($process_text): ?>
            <p class="subtext"><?php echo esc_html($process_text); ?></p>
          <?php endif; ?>
        </div>
      </div>

      <?php if ($has_steps): ?>
        <div class="steps">
          <?php while (have_rows('steps_loop')): the_row(); 
            $step_number = get_sub_field('step_number');
            $step_title = get_sub_field('step_title');
            $step_description = get_sub_field('step_description');
            $step_icon = get_sub_field('step_icon');
          ?>
          <div class="step">
            <div class="step-icon">
              <?php if (!empty($step_icon)): ?>
                <img src="<?php echo esc_url($step_icon['url']); ?>" alt="<?php echo esc_attr($step_icon['alt']); ?>">
              <?php endif; ?>
            </div>
            <p><?php echo esc_html($step_number); ?></p>
            <h4><?php echo esc_html($step_title); ?></h4>
            <p><?php echo esc_html($step_description); ?></p>
          </div>
          <?php endwhile; ?>
        </div>
      <?php endif; ?>

      <?php if ($process_description): ?>
        <p class="footer-note"><?php echo esc_html($process_description); ?></p>
      <?php endif; ?>
    </div>
  </div>
</section>
<?php endif; ?>



<!-- Why Choose LingArch  -->
<!-- <section class="why_choose_service">
  <div class="container">
    <?php 
      $why_title = get_field('why_choose_title');
      $why_desc = get_field('why_choose_description');
    ?>

    <?php if ($why_title): ?>
    <h2 class="section-heading"><?php echo esc_html($why_title); ?></h2>
    <?php endif; ?>

    <?php if ($why_desc): ?>
    <p><?php echo esc_html($why_desc); ?></p>
    <?php endif; ?>
    <?php if (have_rows('why_cards')): ?>
    <div class="why_card_main">
      <?php while (have_rows('why_cards')): the_row(); 
      $icon = get_sub_field('icon'); // ACF image field (assumed array)
      $title = get_sub_field('title');
      $description = get_sub_field('description');
    ?>
      <div class="why_card_sub">
        <?php if (!empty($icon) && is_array($icon)): ?>
        <img src="<?php echo esc_url($icon['url']); ?>" alt="<?php echo esc_attr($icon['alt']); ?>">
        <?php endif; ?>
        <?php if ($title): ?>
        <h4><?php echo esc_html($title); ?></h4>
        <?php endif; ?>
        <?php if ($description): ?>
        <p><?php echo esc_html($description); ?></p>
        <?php endif; ?>
      </div>
      <?php endwhile; ?>
    </div>
    <?php endif; ?>

    <?php if (have_rows('why_cards_second')): ?>
    <div class="why_sub-2">
      <?php while (have_rows('why_cards_second')): the_row(); 
      $icon = get_sub_field('icon'); // ACF image field (assumed array)
      $title = get_sub_field('title');
      $description = get_sub_field('description');
    ?>
      <div class="why_card_sub">
        <?php if (!empty($icon) && is_array($icon)): ?>
        <img src="<?php echo esc_url($icon['url']); ?>" alt="<?php echo esc_attr($icon['alt']); ?>">
        <?php endif; ?>
        <?php if ($title): ?>
        <h4><?php echo esc_html($title); ?></h4>
        <?php endif; ?>
        <?php if ($description): ?>
        <p><?php echo esc_html($description); ?></p>
        <?php endif; ?>
      </div>
      <?php endwhile; ?>
    </div>
    <?php endif; ?>


  </div>

</section> -->
<!-- Why Choose LingArch -->
<!-- Why Choose LingArch  -->
<section class="why_choose_section_new">
  <div class="why-choose-container">
    
    <!-- Section Header -->
    <div class="why-choose-header">
      <div class="why-choose-title-col">
        <h2 class="why-choose-title">Why Choose LingArch</h2>
      </div>
      <div class="why-choose-description-col">
        <div class="why-choose-description">
          <p>LingArch combines expert linguists, industry-specific knowledge, and cutting-edge technology to deliver fast, accurate, and reliable translations tailored to your needs.</p>
        </div>
      </div>
    </div>
    
    <!-- Why Choose Cards -->
    <div class="why_choose_main">
      <div class="why_choose_sub-1">
        <img src="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/image/fast-turnaround-1.png" alt="">
        <p>Faster Turnaround: 24–48 hour delivery or same day upon request.</p>
      </div>
      <div class="why_choose_sub-1">
        <img src="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/image/transparency.png" alt="">
        <p>Transparency: Flat-rate pricing and real-time status updates.</p>
      </div>
      <div class="why_choose_sub-1">
        <img src="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/image/certification.png" alt="">
        <p>Certifications: ISO 9001, EN 15038, GDPR, ATC-compliant workflows.</p>
      </div>
      <div class="why_choose_sub-1">
        <img src="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/image/expertise.png" alt="">
        <p>Expertise: 20+ years of legal translation experience.</p>
      </div>
      <div class="why_choose_sub-1">
        <img src="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/image/security.png" alt="">
        <p>Security: Encrypted communication, NDA-bound linguists.</p>
      </div>
      <div class="why_choose_sub-1">
        <img src="<?php echo site_url(); ?>/wp-content/themes/twentytwentyfive/assets/image/flexibility.png" alt="">
        <p>Flexibility: 120+ languages supported, across time zones.</p>
      </div>
    </div>

  </div>
</section>
<!-- Why Choose LingArch -->

<!-- Other Legal Services  -->
<?php
$other_legal_title = get_post_meta(get_the_ID(), 'other_legal_title', true);
$other_legal_description = get_post_meta(get_the_ID(), 'other_legal_description', true);
$process_description_last = get_post_meta(get_the_ID(), 'process_description_last', true);
$has_other_services = have_rows('other_services_loop');

if ($other_legal_title || $other_legal_description || $has_other_services || $process_description_last):
?>
<section class="other_legal_services">
  <div class="container">
    <!-- Swiss Grid Header -->
    <div class="other-legal-header">
      <div class="other-legal-title-col">
        <?php if ($other_legal_title): ?>
          <h2 class="section-heading"><?php echo esc_html($other_legal_title); ?></h2>
        <?php endif; ?>
      </div>
      <div class="other-legal-description-col">
        <?php if ($other_legal_description): ?>
          <div class="other-legal-description">
            <p class="section-description"><?php echo esc_html($other_legal_description); ?></p>
          </div>
        <?php endif; ?>
      </div>
    </div>

    <?php if ($has_other_services): ?>
    <div class="other-services_main owl-carousel owl-theme">
      <?php while (have_rows('other_services_loop')): the_row(); 
        $title = get_sub_field('title');
        $description = get_sub_field('description');
        $button_link = get_sub_field('button_link');
        $button_text = get_sub_field('button_text');
      ?>
      <div class="other_sub_1">
        <?php if ($title): ?>
          <h4><?php echo esc_html($title); ?></h4>
        <?php endif; ?>

        <?php if ($description): ?>
          <p><?php echo wp_kses_post($description); ?></p>
        <?php endif; ?>

        <?php if ($button_link): ?>
        <div class="get_quote">
          <a href="<?php echo esc_url($button_link['url']); ?>" target="<?php echo esc_attr($button_link['target'] ?: '_self'); ?>">
            <?php echo esc_html($button_text); ?>
          </a>
        </div>
        <?php endif; ?>
      </div>
      <?php endwhile; ?>
    </div>
    <?php endif; ?>

    <?php if ($process_description_last): ?>
      <p class="section-description down_p"><?php echo esc_html($process_description_last); ?></p>
    <?php endif; ?>
    
  </div>
</section>
<?php endif; ?>

<!-- Other Legal Services -->
<?php
$conclusion_title = get_post_meta(get_the_ID(), 'conclusion_title', true);
$conclusion_description = get_post_meta(get_the_ID(), 'conclusion_description', true);

if ($conclusion_title || $conclusion_description):
?>
<section class="service-4-section service-4-section_new">
  <div class="container">
    <!-- Swiss Grid Header -->
    <div class="conclusion-header">
      <div class="conclusion-title-col">
        <?php if ($conclusion_title): ?>
          <h2 class="section-heading"><?php echo esc_html($conclusion_title); ?></h2>
        <?php endif; ?>
      </div>
      <div class="conclusion-description-col">
        <?php if ($conclusion_description): ?>
          <div class="conclusion-description">
            <p class="section-description"><?php echo wp_kses_post($conclusion_description); ?></p>
          </div>
        <?php endif; ?>
      </div>
    </div>
  </div>
</section>
<?php endif; ?>

<!-- New Case Studies Section -->
<section class="case-studies-new">
  <div class="case-studies-container">
    
    <!-- Section Header -->
    <div class="section-header-border">
      <h2 class="section-kicker">Case studies</h2>
    </div>
    
    <!-- Section Description -->
    <div class="section-description">
      <p>Real client success stories showcasing our expertise in delivering accurate, culturally-aware translations that protect your business, meet regulatory requirements, and drive global expansion.</p>
    </div>
    
    <!-- Case Studies Content -->
    <div class="case-studies-content">
      <!-- Case Studies Carousel -->
      <div class="case-studies-carousel">
        <div class="case-studies-track" id="caseStudiesTrack">
          <?php
          $args = array(
            'post_type' => 'case-studies',
            'posts_per_page' => 12,
            'orderby' => 'date',
            'order' => 'DESC'
          );
          $case_studies = new WP_Query($args);

          if ($case_studies->have_posts()) :
            $case_counter = 1; // Counter for consecutive numbering
            while ($case_studies->have_posts()) : $case_studies->the_post(); 
              // Generate consecutive number with leading zero
              $case_number = sprintf('%02d', $case_counter);
              $case_month = get_post_meta(get_the_ID(), 'case_month', true) ?: date('M');
              $case_year = get_post_meta(get_the_ID(), 'case_year', true) ?: date('Y');
              $short_description = get_post_meta(get_the_ID(), 'short_description', true) ?: wp_trim_words(get_the_excerpt(), 5, '');
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
              $case_counter++; // Increment counter for next iteration
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
      
      <!-- Navigation Controls -->
      <div class="case-studies-nav">
        <button class="nav-btn prev-btn" id="casePrevBtn">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M8.75 11.25L5.25 7.75L8.75 4.25" stroke="#0B1C34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="nav-btn next-btn" id="caseNextBtn">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5.25 11.25L8.75 7.75L5.25 4.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</section>
<!-- New Case Studies Section -->
<!-- Latest Blogs -->
<section class="latest_blog_section">
  <div class="container">
    <div class="blog-studies-container">
    
    <!-- Section Header -->
    <div class="blog-header-new">
      <div class="blog-title-col">
        <h2 class="blog-title">Latest Blogs</h2>
      </div>
      <div class="blog-description-col">
        <div class="blog-description">
          <p>Stay informed with the latest insights, industry trends, and expert advice from our language professionals. Discover how translation excellence drives global success.</p>
          <a href="<?php echo home_url('/blog'); ?>" class="btn-ghost">
            <span>See all blogs</span>
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
              <path d="M1 6H19M19 6L14 1M19 6L14 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
    
    <!-- Blog Studies Content -->
    <div class="blog-studies-grid">
      <?php
      $latest_blogs = new WP_Query(array(
        'post_type' => 'post',
        'posts_per_page' => 3,
        'orderby' => 'date',
        'order' => 'DESC'
      ));

      if ($latest_blogs->have_posts()) :
        while ($latest_blogs->have_posts()) : $latest_blogs->the_post();
          $blog_month = get_the_date('M');
          $blog_year = get_the_date('Y');
          $author_name = get_the_author();
          $short_excerpt = wp_trim_words(get_the_excerpt(), 15, '...');
          ?>
        
        <div class="blog-card-new">
          <a href="<?php the_permalink(); ?>" class="blog-link-new">
            <div class="blog-card-inner">
              
              <!-- Background Image -->
              <?php if (has_post_thumbnail()) : ?>
                <div class="blog-bg" style="background-image: url('<?php the_post_thumbnail_url('large'); ?>');"></div>
              <?php else : ?>
                <div class="blog-bg"></div>
              <?php endif; ?>
              
              <!-- Dark Gradient Overlay -->
              <div class="blog-gradient-overlay"></div>
              
              <!-- White Overlay with Content -->
              <div class="blog-overlay">
                <div class="blog-info">
                  <h3 class="blog-title-new"><?php the_title(); ?></h3>
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
        
        <?php
        endwhile;
        wp_reset_postdata();
      else :
        echo '<p>No recent blogs found.</p>';
      endif;
      ?>
    </div>
    </div>
  </div>
</section>

<!-- Latest Blogs -->
<!-- Frequently Asked Questions  -->
<section class="faqs-section">
  <div class="faqs-container">
    
    <!-- Section Header -->
    <div class="faqs-header">
      <div class="faqs-tagline">
        <span>Support</span>
      </div>
      <h2 class="faqs-title">Frequently Asked Questions</h2>
      <?php 
      $faq_intro = get_post_meta(get_the_ID(), 'faq_text', true);
      if (!empty($faq_intro)) {
        echo '<div class="section-description"><p>' . wp_kses_post($faq_intro) . '</p></div>';
      }
      ?>
    </div>

    <!-- FAQs Content -->
    <div class="faqs-content">
      <div class="faqs-list" itemscope itemtype="https://schema.org/FAQPage">
        <?php 
        for ($i = 1; $i <= 20; $i++): 
          $question = get_post_meta(get_the_ID(), "{$i}_faq_question", true);
          $answer   = get_post_meta(get_the_ID(), "{$i}_faq_answer", true);

          if (!empty($question) && !empty($answer)):
        ?>
        <div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <div class="faq-question">
            <h3 itemprop="name"><?php echo esc_html($question); ?></h3>
            <div class="faq-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="#0B1C34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div class="faq-answer" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <p itemprop="text"><?php echo wp_kses_post($answer); ?></p>
          </div>
        </div>
        <?php 
          endif; 
        endfor; 
        ?>
      </div>
    </div>
    
  </div>
</section>


<!-- 
<section class="faq_section_service">
  <div class="container">
    <h2 class="section-heading">Frequently Asked Questions</h2>

    <?php 
    // $faq_intro = get_post_meta(get_the_ID(), 'faq_text', true);
    // if (!empty($faq_intro)) {
    //   echo '<p>' . esc_html($faq_intro) . '</p>';
    // }
    ?>

    <div class="faq_main_div">
      <div class="faq-container" id="faqContainer" itemscope itemtype="https://schema.org/FAQPage">
        <?php 
        // $faq_count = 0;
        // for ($i = 1; $i <= 20; $i++): 
        //   $question = get_post_meta(get_the_ID(), "{$i}_faq_question", true);
        //   $answer   = get_post_meta(get_the_ID(), "{$i}_faq_answer", true);

        //   if (!empty($question) && !empty($answer)):
        //     $faq_count++;
        //     $display_style = ($faq_count > 3) ? 'style="display: none;"' : '';
        ?>
        <div class="faq-box" <?php //echo $display_style; ?> itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <div class="faq_conent">
            <h3 itemprop="name"><?php //echo esc_html($question); ?></h3>
            <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
              <p itemprop="text"><?php //echo esc_html($answer); ?></p>
            </div>
          </div>
        </div>
        <?php 
        //   endif; 
        // endfor; 
        ?>
      </div>
    </div>
  </div>
</section>
-->



<!-- Frequently Asked Questions -->
<!-- Form Section start -->
<section class="home_form_section">
  <div class="container">
    <div class="form_sectin_main_div row">
      <div class="form_conent col-lg-6">
        <div class="section-kicker">
          <span>Get Started</span>
        </div>
        <h3>Get in touch with us.<br> We're here to assist you.</h3>
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

<?php get_footer(); ?>