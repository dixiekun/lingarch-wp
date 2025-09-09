FROM wordpress:latest

# Increase PHP upload limits
RUN echo "upload_max_filesize = 100M" >> /usr/local/etc/php/conf.d/uploads.ini && \
    echo "post_max_size = 100M" >> /usr/local/etc/php/conf.d/uploads.ini && \
    echo "max_execution_time = 300" >> /usr/local/etc/php/conf.d/uploads.ini && \
    echo "max_input_time = 300" >> /usr/local/etc/php/conf.d/uploads.ini

# Copy complete custom theme
COPY twentytwentyfive/ /var/www/html/wp-content/themes/twentytwentyfive/

# Set proper permissions  
RUN chown -R www-data:www-data /var/www/html/wp-content/themes/twentytwentyfive
RUN chmod -R 755 /var/www/html/wp-content/themes/twentytwentyfive

EXPOSE 80