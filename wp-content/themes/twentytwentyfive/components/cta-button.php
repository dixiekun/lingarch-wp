<?php
/* CTA Button Component - dixie designs */

function lingarch_cta_button($text = 'Schedule a Meeting', $modal_target = '#enquiry-form', $size = 'default') {
    $size_class = $size === 'small' ? 'btn-primary-small' : 'btn-primary';
    
    ob_start();
    ?>
    <a href="#" class="<?php echo esc_attr($size_class); ?>" data-bs-toggle="modal" data-bs-target="<?php echo esc_attr($modal_target); ?>" role="button" aria-controls="<?php echo esc_attr(str_replace('#', '', $modal_target)); ?>">
        <span><?php echo esc_html($text); ?></span>
        <span class="btn-icon">
            <div class="icon-container">
                <svg class="arrow-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7V17M17 7H7" stroke="#2c2cf3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <svg class="arrow-icon arrow-duplicate" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7V17M17 7H7" stroke="#2c2cf3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </span>
    </a>
    <?php
    return ob_get_clean();
}
?>