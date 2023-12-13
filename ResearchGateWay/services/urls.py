from django.urls import path

from . import views

urlpatterns = [
    path('login/',views.login, name='to login user'),
    path('register/',views.register, name='to register user'),
    path('createModerator/',views.createModerator, name='to create moderator'),
    path('getAllModerators/',views.getAllModerators, name='to list moderators'),
    path('deleteModerator/<int:id>/',views.deleteModerator, name='to delete moderators'),
]