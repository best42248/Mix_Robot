FROM mongo:latest

# Set working directory
WORKDIR /docker-entrypoint-initdb.d

# Copy files in a single layer to reduce image size
COPY ./dump/db_mixRobot /docker-entrypoint-initdb.d/backup/
COPY init.sh /

# Set permissions and clean up in a single layer
RUN chmod +x /init.sh && \
    # Ensure consistent line endings
    find /docker-entrypoint-initdb.d/backup -type f -exec dos2unix {} \; && \
    # Set appropriate permissions
    chown -R mongodb:mongodb /docker-entrypoint-initdb.d && \
    chmod -R 755 /docker-entrypoint-initdb.d

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD mongosh --eval "db.adminCommand('ping')" || exit 1

# Use non-root user for security
USER mongodb

# Use exec form of CMD
CMD ["/init.sh"]
