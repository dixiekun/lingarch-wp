  <?php
  /* Template Name: Sitemap page */

  get_header(); 
  ?>
  <style>
    .sitemap_main {
      display: grid;
      grid-template-columns: 1fr 2fr 2fr;
      gap: 20px;
  }
  .panel {
      background: #F7FBFF;
      padding: 20px;
  }
  .panel ul {
      margin: 0;
      padding: 0;
  }
  .panel h2 {
      font-family: 'Montserrat-Bold';
      font-size: 22px;
      margin-bottom: 15px;
  }
  .panel li a {
      text-decoration: none;
      color: #5D7699;
      font-size: 16px;
      transition: color 0.3s;
      font-family: Montserrat-Regular;
      letter-spacing: 0.10px;
  }
  .panel li {
      list-style: disc;
      margin: 10px;
  }
  @media screen and (max-width: 1100px) {
    .sitemap_main {
    grid-template-columns: 2fr 2fr;
    }
}
  @media screen and (max-width: 800px) {
    .sitemap_main {
    grid-template-columns: 2fr ;
    }
    section.sitemap {
    padding: 30px 10px;
}
}
  </style>
  <section class="sitemap">
    <div class="container">
<div class="sitemap_main">
  <!-- Column 1 -->
  <div class="panel" aria-labelledby="general-heading">
    <h2 id="general-heading">General</h2>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About Us</a></li>
      <li><a href="/blog">Blog</a></li>
      <li><a href="/case-studies">Case Studies</a></li>
      <li><a href="/contact">Contact Us</a></li>
      <li><a href="/sitemap">Sitemap</a></li>
      <li><a href="/gdpr-cookie-policy">GDPR Cookie Policy</a></li>
    </ul>
  </div>

  <!-- Column 2 -->
  <div class="panel panel--tall" aria-labelledby="services-heading">
    <h2 id="services-heading">Services</h2>
    <ul>
      <li><a href="/document-translation-services">Document Translation Services</a></li>
      <li><a href="/legal-translation-services">Legal Translation Services</a></li>
      <li><a href="/medical-translation-services">Medical Translation Services</a></li>
      <li><a href="/machine-translation-services">Machine Translation Services</a></li>
      <li><a href="/transcription-services">Transcription Services</a></li>
      <li><a href="/legal-transcription-services">Legal Transcription Services</a></li>
      <li><a href="/medical-transcription-services">Medical Transcription Services</a></li>
      <li><a href="/voice-over-services">Voice Over Services</a></li>
      <li><a href="/voice-over-services-for-commercials">Voice Over for Commercials</a></li>
      <li><a href="/voice-overs-for-e-learning">Voice Overs for e-Learning</a></li>
      <li><a href="/documentary-voice-over-services">Documentary Voice Over Services</a></li>
      <li><a href="/subtitling-services">Subtitling Services</a></li>
      <li><a href="/interpretation-services">Interpretation Services</a></li>
      <li><a href="/simultaneous-interpretation-services">Simultaneous Interpretation Services</a></li>
      <li><a href="/consecutive-interpretation-services">Consecutive Interpretation Services</a></li>
      <li><a href="/medical-interpretation-services">Medical Interpretation Services</a></li>
      <li><a href="/deposition-services">Deposition Services</a></li>
      <li><a href="/deposition-videographer-services">Deposition Videographer Services</a></li>
      <li><a href="/court-reporting-services">Court Reporting Services</a></li>
      <li><a href="/litigation-support-services">Litigation Support Services</a></li>
      <li><a href="/patent-translation-services">Patent Translation Services</a></li>
      <li><a href="/financial-translation-services">Financial Translation Services</a></li>
      <li><a href="/localisation-services">Localisation Services</a></li>
      <li><a href="/e-learning-translation-services">e-Learning Translation Services</a></li>
      <li><a href="/clinical-trial-translation">Clinical Trial Translation Services</a></li>
      <li><a href="/government-translation-services">Government Translation Services</a></li>
      <li><a href="/travel-hospitality-translation-services">Travel & Hospitality Translation Services</a></li>
      <li><a href="/pharmaceutical-translation-services">Pharmaceutical Translation Services</a></li>
      <li><a href="/retail-translation-services">Retail Translation Services</a></li>
    </ul>
  </div>

  <!-- Column 3 -->
  <div class="panel panel--tall" aria-labelledby="lang-heading">
    <h2 id="lang-heading">Language Translation Services</h2>
    <ul>
      <li><a href="/arabic-translation-services">Arabic Translation Services</a></li>
      <li><a href="/chinese-translation-services">Chinese Translation Services</a></li>
      <li><a href="/french-translation">French Translation Services</a></li>
      <li><a href="/german-translation-services">German Translation Services</a></li>
      <li><a href="/spanish-translation-services">Spanish Translation Services</a></li>
      <li><a href="/italian-translation-services">Italian Translation Services</a></li>
      <li><a href="/japanese-translation-services">Japanese Translation Services</a></li>
      <li><a href="/russian-translation-services">Russian Translation Services</a></li>
      <li><a href="/portuguese-translation-services">Portuguese Translation Services</a></li>
      <li><a href="/swedish-translation-services">Swedish Translation Services</a></li>
      <li><a href="/indonesian-translation-services">Indonesian Translation Services</a></li>
      <li><a href="/hebrew-translation-services">Hebrew Translation Services</a></li>
      <li><a href="/mandarin-translation-services">Mandarin Translation Services</a></li>
      <li><a href="/korean-translation-services">Korean Translation Services</a></li>
      <li><a href="/malay-translation-services">Malay Translation Services</a></li>
      <li><a href="/hindi-translation-services">Hindi Translation Services</a></li>
    </ul>
  </div>
</div>

    </div>
  </section>
  <?php get_footer(); ?>