# Gunakan Bun image resmi
FROM oven/bun:latest

# Set working directory
WORKDIR /app

# Copy semua file
COPY . .

# Install dependencies
RUN bun install


RUN bun add -d prisma

# Generate prisma
RUN bunx prisma generate

# Expose port (sesuaikan dengan app kamu)
EXPOSE 3000

# Run app
CMD ["bun", "run", "src/app.js"]