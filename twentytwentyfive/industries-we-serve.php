  <!-- Industries we serve section -->
  <section class="industries_section">
    <div class="container">
      <h2 class="section-heading"><?php echo get_post_meta(get_the_ID(), 'industries_title', true); ?></h2>
      <div class="industries_main_div">

      <?php if (have_rows('industries_loop')): ?>
    <?php $yt = 1;
    while (have_rows('industries_loop')): the_row();

        $industries_trust_img = get_sub_field('industries_image'); 
        $industries_trust_title = get_sub_field('industries_title'); 

        if ($industries_trust_img): ?>
            <div class="item-content your-trusted-<?php echo $yt; ?>">
                <img src="<?php echo esc_url($industries_trust_img['url']); ?>" alt="<?php echo esc_attr($industries_trust_img['alt']); ?>">
                <?php if ($industries_trust_title): ?>
                    <div class="h3_conent">
                        <h3><?php echo esc_html($industries_trust_title); ?></h3>
                    </div>
                <?php endif; ?>
            </div>
        <?php endif; ?>

        <?php $yt++;
    endwhile; ?>
<?php endif; ?>
      </div>
    </div>
  </section>
  <!-- Industries we serve section -->