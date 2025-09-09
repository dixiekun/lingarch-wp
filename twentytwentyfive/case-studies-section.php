<section class="case-studies-new">
  <div class="case-studies-container">
    
    <!-- Section Header -->
    <div class="section-header-border" data-animate>
      <h2 class="section-kicker">Case studies</h2>
    </div>
    
    <!-- Section Description -->
    <div class="section-description" data-animate>
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
      <div class="case-studies-nav" data-animate>
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