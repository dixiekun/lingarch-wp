
  <section class="global_brand_section">
    <div class="infinite-logos-container">
      <div class="infinite-logos-track">
        <?php if (have_rows('trusted_loop')): ?>
          <?php while (have_rows('trusted_loop')): the_row();
            $your_trust = get_sub_field('image'); ?>
            <div class="logo-item">
              <img src="<?php echo $your_trust['url']; ?>" alt="<?php echo $your_trust['alt'] ? $your_trust['alt'] : $your_trust['title']; ?>">
            </div>
          <?php endwhile; ?>
          
          <!-- Duplicate logos for seamless loop -->
          <?php while (have_rows('trusted_loop')): the_row();
            $your_trust = get_sub_field('image'); ?>
            <div class="logo-item">
              <img src="<?php echo $your_trust['url']; ?>" alt="<?php echo $your_trust['alt'] ? $your_trust['alt'] : $your_trust['title']; ?>">
            </div>
          <?php endwhile; ?>
        <?php endif; ?>
      </div>
      <div class="gradient-overlay gradient-left"></div>
      <div class="gradient-overlay gradient-right"></div>
    </div>
  </section>