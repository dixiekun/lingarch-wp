FROM wordpress:latest

# Install curl for health checks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copy WordPress configuration
COPY wp-config.php /var/www/html/wp-config.php

# Copy complete custom theme
COPY twentytwentyfive/ /var/www/html/wp-content/themes/twentytwentyfive/

# Set proper permissions  
RUN chown -R www-data:www-data /var/www/html/wp-content/themes/twentytwentyfive
RUN chown www-data:www-data /var/www/html/wp-config.php
RUN chmod -R 755 /var/www/html/wp-content/themes/twentytwentyfive
RUN chmod 644 /var/www/html/wp-config.php

EXPOSE 80