<section class="industries-new">
  <div class="industries-container">
    <!-- Section Header -->
    <div class="industries-header">
      <div class="section-kicker" data-animate>
        <span>Trusted Expertise</span>
      </div>
      <h2 class="industries-title" data-animate>Industries we serve</h2>
      <div class="industries-description" data-animate>
        <p>Each industry has unique requirements and regulatory standards. We understand the specific terminology, compliance needs, and cultural considerations that matter in your field.</p>
      </div>
    </div>
    
    <!-- Industries List -->
    <div class="industries-list" data-animate>
      <?php if (have_rows('industries_loop')): ?>
        <?php while (have_rows('industries_loop')): the_row();
          $industries_title = get_sub_field('industries_title');
          $industries_image = get_sub_field('industries_image'); 
          if ($industries_title): ?>
            <div class="industry-item">
              <?php if ($industries_image): ?>
                <div class="industry-image">
                  <img src="<?php echo esc_url($industries_image['url']); ?>" alt="<?php echo esc_attr($industries_image['alt']); ?>">
                </div>
              <?php endif; ?>
              <h3><?php echo esc_html($industries_title); ?></h3>
            </div>
          <?php endif;
        endwhile; ?>
      <?php else : ?>
        <!-- Fallback industries if no ACF data exists -->
        <div class="industry-item">
          <div class="industry-image">
            <img src="https://via.placeholder.com/80x80" alt="Healthcare & Hospitals">
          </div>
          <h3>Healthcare & Hospitals</h3>
        </div>
        <div class="industry-item">
          <div class="industry-image">
            <img src="https://via.placeholder.com/80x80" alt="Regulatory & Government Agencies">
          </div>
          <h3>Regulatory & Government Agencies</h3>
        </div>
        <div class="industry-item">
          <div class="industry-image">
            <img src="https://via.placeholder.com/80x80" alt="Pharmaceutical & Biotechnology">
          </div>
          <h3>Pharmaceutical & Biotechnology</h3>
        </div>
        <div class="industry-item">
          <div class="industry-image">
            <img src="https://via.placeholder.com/80x80" alt="Retail & E-Commerce">
          </div>
          <h3>Retail & E-Commerce</h3>
        </div>
        <div class="industry-item">
          <div class="industry-image">
            <img src="https://via.placeholder.com/80x80" alt="Automotive Industry">
          </div>
          <h3>Automotive Industry</h3>
        </div>
        <div class="industry-item">
          <div class="industry-image">
            <img src="https://via.placeholder.com/80x80" alt="Legal Industry">
          </div>
          <h3>Legal Industry</h3>
        </div>
        <div class="industry-item">
          <div class="industry-image">
            <img src="https://via.placeholder.com/80x80" alt="Academic & Education">
          </div>
          <h3>Academic & Education</h3>
        </div>
        <div class="industry-item">
          <div class="industry-image">
            <img src="https://via.placeholder.com/80x80" alt="Medical Industry">
          </div>
          <h3>Medical Industry</h3>
        </div>
        <div class="industry-item">
          <div class="industry-image">
            <img src="https://via.placeholder.com/80x80" alt="Advertising & PR">
          </div>
          <h3>Advertising & PR</h3>
        </div>
        <div class="industry-item">
          <div class="industry-image">
            <img src="https://via.placeholder.com/80x80" alt="Clinical Trial Translations">
          </div>
          <h3>Clinical Trial Translations</h3>
        </div>
      <?php endif; ?>
    </div>
  </div>
</section>