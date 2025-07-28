#FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

#WORKDIR /src
#COPY ["src/Apex_IT.Web.Host/Apex_IT.Web.Host.csproj", "src/Apex_IT.Web.Host/"]
#COPY ["src/Apex_IT.Web.Core/Apex_IT.Web.Core.csproj", "src/Apex_IT.Web.Core/"]
#COPY ["src/Apex_IT.Application/Apex_IT.Application.csproj", "src/Apex_IT.Application/"]
#COPY ["src/Apex_IT.Core/Apex_IT.Core.csproj", "src/Apex_IT.Core/"]
#COPY ["src/Apex_IT.EntityFrameworkCore/Apex_IT.EntityFrameworkCore.csproj", "src/Apex_IT.EntityFrameworkCore/"]
#WORKDIR "/src/src/Apex_IT.Web.Host"
#RUN dotnet restore 

#WORKDIR /src
#COPY ["src/Apex_IT.Web.Host", "src/Apex_IT.Web.Host"]
#COPY ["src/Apex_IT.Web.Core", "src/Apex_IT.Web.Core"]
#COPY ["src/Apex_IT.Application", "src/Apex_IT.Application"]
#COPY ["src/Apex_IT.Core", "src/Apex_IT.Core"]
#COPY ["src/Apex_IT.EntityFrameworkCore", "src/Apex_IT.EntityFrameworkCore"]
#WORKDIR "/src/src/Apex_IT.Web.Host"
#RUN dotnet publish -c Release -o /publish --no-restore

#FROM mcr.microsoft.com/dotnet/aspnet:8.0
#EXPOSE 80
#WORKDIR /app
#COPY --from=build /publish .
#ENTRYPOINT ["dotnet", "Apex_IT.Web.Host.dll"]

# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy solution and all project files
COPY Apex_IT.sln ./
COPY src/ ./src/

WORKDIR /app/src/Apex_IT.Web.Host
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80

ENTRYPOINT ["dotnet", "Apex_IT.Web.Host.dll"]