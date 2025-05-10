from django.urls import path
from . import views

urlpatterns = [
    path('logo/', views.logo_page, name='logo_page'),
    path('landing/', views.landing_page, name='landing_page'), 
    path('explain/', views.explain_page, name='explain_page'),
    path('chatbot/', views.chatbot_page, name='chatbot_page'),
]
