from django.db.models.signals import post_save, pre_delete
from base.models import MyUser
from django.dispatch import receiver
from .models import Profile
from django.contrib.auth import get_user_model
from django.db import models

from .models import Profile

@receiver(post_save, sender=MyUser)
def create_user_profile(sender, instance, created, **kwargs):
    """
        Create a user profile when a new user is created.

        Args:
            sender: The sender of the signal.
            instance: The instance of the model that triggered the signal.
            created: A boolean indicating whether the model instance was created or updated.
            **kwargs: Additional keyword arguments.

        Returns:
            None
    """
    if created:
        user = instance
        Profile.objects.create(
            user=user,
            fullname=user.fullname,
            date_of_birth=instance.date_of_birth

        )


@receiver(post_save, sender=Profile)
def updateuser(sender,instance,created,**kwargs):
    """
        Updates the first name and last name of a user based on the changes made to the associated profile.

        Args:
            sender: The sender of the signal.
            instance: The instance of the Profile model that was saved.
            created: A boolean indicating whether the profile was created or not.
            **kwargs: Additional keyword arguments.

        Returns:
            None.
    """
    profile = instance
    user = profile.user
    if created == False:
        user.first_name = profile.fullname.split()[0]
        user.last_name = profile.fullname.split()[1]

@receiver(pre_delete, sender=Profile)
def delete_user_on_profile_delete(sender, instance, **kwargs):
    """
        Deletes the associated user when a profile is deleted.
    """
    user = instance.user
    user.delete()
