FROM alpine:3.13.2

# Install thttpd
RUN apk add thttpd

# Create a non-root user to own the files and run our server
WORKDIR /var/www/http/

# Copy the static website
# Use the .dockerignore file to control what ends up inside the image!
COPY . .

# Run thttpd
CMD ["thttpd", "-D", "-h", "0.0.0.0", "-p", "3000"]
