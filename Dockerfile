FROM wordpress:latest

# Copy only essential custom theme files (PHP and CSS only)
COPY twentytwentyfive/*.php /var/www/html/wp-content/themes/twentytwentyfive/
COPY twentytwentyfive/style.css /var/www/html/wp-content/themes/twentytwentyfive/
COPY twentytwentyfive/assets/css/ /var/www/html/wp-content/themes/twentytwentyfive/assets/css/

# Set proper permissions  
RUN chown -R www-data:www-data /var/www/html/wp-content/themes/twentytwentyfive
RUN chmod -R 755 /var/www/html/wp-content/themes/twentytwentyfive

EXPOSE 80