FROM wordpress:latest

# Copy complete custom theme
COPY twentytwentyfive/ /var/www/html/wp-content/themes/twentytwentyfive/

# Set proper permissions  
RUN chown -R www-data:www-data /var/www/html/wp-content/themes/twentytwentyfive
RUN chmod -R 755 /var/www/html/wp-content/themes/twentytwentyfive

EXPOSE 80