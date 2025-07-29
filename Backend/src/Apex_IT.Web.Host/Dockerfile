# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy solution and projects
COPY Apex_IT.sln ./
COPY src/ ./src/

# Restore dependencies
WORKDIR /app/src/Apex_IT.Web.Host
RUN dotnet restore

# Publish the app
RUN dotnet publish -c Release -o /app/publish --no-restore

# Runtime Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80

ENTRYPOINT ["dotnet", "Apex_IT.Web.Host.dll"]
