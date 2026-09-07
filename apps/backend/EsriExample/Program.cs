using MyApp.Namespace;

var builder = WebApplication.CreateBuilder(args);

const string CorsAllowedOrigins = "_corsAllowedOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: CorsAllowedOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:5173") // Note: NO trailing slash here
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});


// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddHttpClient<TrailsService>();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseRouting();

app.UseCors(CorsAllowedOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
