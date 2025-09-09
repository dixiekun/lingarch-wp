<?php
/* Template Name: Pay an Invoice */

get_header(); 

?>
<section class="pay_an_invoice">
    <div class="container">
        <div class="pay_invoice_main">
            <?php echo do_shortcode('[gravityform id="2" title="true"]'); ?>
        </div>

    </div>

</section>

<?php get_footer(); ?>