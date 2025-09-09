FROM wordpress:latest

# Copy WordPress configuration
COPY wp-config.php /var/www/html/wp-config.php

# Copy complete custom theme
COPY twentytwentyfive/ /var/www/html/wp-content/themes/twentytwentyfive/

# Set proper permissions  
RUN chown -R www-data:www-data /var/www/html/wp-content/themes/twentytwentyfive
RUN chown www-data:www-data /var/www/html/wp-config.php
RUN chmod -R 755 /var/www/html/wp-content/themes/twentytwentyfive
RUN chmod 644 /var/www/html/wp-config.php

# Add health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

EXPOSE 80