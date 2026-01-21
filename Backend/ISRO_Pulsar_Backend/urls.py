from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('APIs.urls')),
    path('', TemplateView.as_view(template_name='index.html'), name='home'),
    path('detect.html', TemplateView.as_view(template_name='detect.html')),
    path('num.html', TemplateView.as_view(template_name='num.html')),
    path('img.html', TemplateView.as_view(template_name='img.html')),
    path('both.html', TemplateView.as_view(template_name='both.html')),
    path('format.html', TemplateView.as_view(template_name='format.html')),
    path('about.html', TemplateView.as_view(template_name='about.html')),
]