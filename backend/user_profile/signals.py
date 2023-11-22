from django.db.models.signals import post_save, pre_delete
from base.models import MyUser
from django.dispatch import receiver
from .models import Profile

@receiver(post_save, sender=MyUser)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(
            user=instance,
            fullname=instance.fullname,
            date_of_birth=instance.date_of_birth
        )

@receiver(post_save, sender=MyUser)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()
