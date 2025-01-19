using Vite.AspNetCore;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);


builder.Services.AddViteServices(options =>
{
    options.Server.PackageDirectory = "../energidata_vue";
    options.Server.AutoRun = true;
    options.Server.Port = 5173;
    options.Server.Https = false;
});


builder.CreateUmbracoBuilder()
    .AddBackOffice()
    .AddWebsite()
    .AddDeliveryApi()
    .AddComposers()
    .Build();

WebApplication app = builder.Build();

await app.BootUmbracoAsync();


app.UseUmbraco()
    .WithMiddleware(u =>
    {
        u.UseBackOffice();
        u.UseWebsite();
    })
    .WithEndpoints(u =>
    {
        u.UseBackOfficeEndpoints();
        u.UseWebsiteEndpoints();
    });

if (app.Environment.IsDevelopment())
{
    Console.WriteLine("app.Environment.IsDevelopment()");
    Console.WriteLine(app.Environment.IsDevelopment());
    app.UseViteDevelopmentServer(true);
}

await app.RunAsync();
