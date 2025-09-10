<?php
/* Template Name: Thank You page */

get_header(); 

?>
<style>
    .thank_you_section {
  background-image: url('<?php echo site_url(); ?>/wp-content/uploads/2025/08/voice-over-services-for-commercials.png'); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 80px 20px; /* adjust as needed */
  color: #fff; /* light text for dark background */
  text-align: center;
}

.thank_you_section a {
    background: #0069DB;
    color: #fff !important;
    border-radius: 3px;
    font-family: 'Poppins-Regular';
    text-transform: uppercase;
    font-weight: 500;
    font-size: 14px;
    line-height: 12px;
    padding: 5px 20px;
    letter-spacing: 3px;
}
.thank_you_section h1 {
    font-size: 35px;
    font-weight: 500;
    color: #fff;
    font-family: 'Montserrat-Bold';
    margin: 20px 0;
    text-align: center;
}

.thank_you_section p {
    font-size: 18px;
    color: #fff;
    margin-bottom: 15px;
    text-align: center;
    font-family: 'Poppins-Regular';
}

</style>
<section class="thank_you_section">
    <div class="container">
        <a href="">Thank You</a>
<h1>Your message has been received
</h1>
<p>We will contact you within a few hours (usually less) Monday to Friday.</p>
<p>If you require a faster response, please</p>
<a href="tel:+442080047800">Call: +44 (0)208 0047 800</a>

    </div>

</section>
<?php get_footer(); ?>