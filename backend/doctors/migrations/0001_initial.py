# Generated by Django 3.2.8 on 2023-11-24 20:57

import cloudinary.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('user_profile', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AvailabilityTimeTable',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('start_time', models.TimeField()),
                ('end_time', models.TimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Diagnosis',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('symptoms', models.CharField(max_length=255)),
                ('diagnosis', models.CharField(max_length=255)),
                ('diagnosis_image', cloudinary.models.CloudinaryField(blank=True, max_length=255, verbose_name='image')),
                ('remarks', models.CharField(max_length=255)),
                ('additional_info', models.TextField(blank=True)),
                ('date', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='diagnosis', to='doctors.availabilitytimetable')),
            ],
        ),
        migrations.CreateModel(
            name='Doctor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('license_info', cloudinary.models.CloudinaryField(blank=True, max_length=255, verbose_name='image')),
                ('specialization', models.CharField(max_length=255)),
                ('hospital', models.CharField(max_length=255)),
                ('address', models.CharField(max_length=255)),
                ('city', models.CharField(max_length=255)),
                ('state', models.CharField(max_length=255)),
                ('zip_code', models.CharField(max_length=255)),
                ('country', models.CharField(max_length=255)),
                ('profile_image', cloudinary.models.CloudinaryField(blank=True, max_length=255, verbose_name='image')),
                ('experience', models.CharField(max_length=255)),
                ('approved', models.BooleanField(default=False)),
                ('timings', models.ManyToManyField(blank=True, related_name='doctors', to='doctors.AvailabilityTimeTable')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Prescriptions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('prescription', models.CharField(max_length=255)),
                ('prescription_image', cloudinary.models.CloudinaryField(blank=True, max_length=255, verbose_name='image')),
                ('remarks', models.CharField(max_length=255)),
                ('additional_info', models.TextField(blank=True)),
                ('date', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='medical_records', to='doctors.availabilitytimetable')),
                ('diagnosis', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='medical_records', to='doctors.diagnosis')),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='medical_records', to='doctors.doctor')),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='medical_records', to='user_profile.profile')),
            ],
        ),
        migrations.AddField(
            model_name='diagnosis',
            name='doctor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='diagnosis', to='doctors.doctor'),
        ),
        migrations.AddField(
            model_name='diagnosis',
            name='patient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='diagnosis', to='user_profile.profile'),
        ),
        migrations.AddField(
            model_name='availabilitytimetable',
            name='doctor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='availability_timetables', to='doctors.doctor'),
        ),
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('additional_info', models.TextField(blank=True)),
                ('date', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='appointment', to='doctors.availabilitytimetable')),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='appointment', to='doctors.doctor')),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='appointment', to='user_profile.profile')),
            ],
        ),
    ]
