FROM wordpress:latest

# Increase PHP upload limits
RUN echo "upload_max_filesize = 100M" >> /usr/local/etc/php/conf.d/uploads.ini && \
    echo "post_max_size = 100M" >> /usr/local/etc/php/conf.d/uploads.ini && \
    echo "max_execution_time = 300" >> /usr/local/etc/php/conf.d/uploads.ini && \
    echo "max_input_time = 300" >> /usr/local/etc/php/conf.d/uploads.ini

# Copy only essential custom theme files (PHP and CSS only)
COPY twentytwentyfive/*.php /var/www/html/wp-content/themes/twentytwentyfive/
COPY twentytwentyfive/style.css /var/www/html/wp-content/themes/twentytwentyfive/
COPY twentytwentyfive/assets/css/ /var/www/html/wp-content/themes/twentytwentyfive/assets/css/

# Set proper permissions  
RUN chown -R www-data:www-data /var/www/html/wp-content/themes/twentytwentyfive
RUN chmod -R 755 /var/www/html/wp-content/themes/twentytwentyfive

EXPOSE 80