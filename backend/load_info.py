def main():
    fake = Faker()

    # create 100 users of the system
    for _ in range(100):
        # Generate fake user data
        fullname = fake.name()
        email = fake.email()
        date_of_birth = fake.date_of_birth().strftime("%Y-%m-%d")
        password = fake.password()

        # Call create_user function to create user
        user = MyUser.objects.create_user(fullname, email, date_of_birth, password)

        # Generate fake profile data
        gender = fake.random_element(elements=('Male', 'Female'))
        contact_number = fake.phone_number()
        street_address = fake.street_address()
        city = fake.city()
        state = fake.state()
        zip_code = fake.zipcode()
        country = fake.country()
        blood_type = fake.random_element(elements=('A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'))
        allergies = fake.text()
        medications = fake.text()

        # Now create the profile for the user with additional fields
        profile = Profile.objects.create(
            user=user,
            fullname=fullname,
            date_of_birth=date_of_birth,
            gender=gender,
            contact_number=contact_number,
            street_address=street_address,
            city=city,
            state=state,
            zip_code=zip_code,
            country=country,
            blood_type=blood_type,
            allergies=allergies,
            medications=medications,
        )

        # Generate fake emergency contacts data
        emergency_contact_1 = {
            'fullname': fake.name(),
            'relationship': 'Family',
            'contact_number': fake.phone_number(),
            'street_address': fake.street_address(),
            'city': fake.city(),
            'state': fake.state(),
            'zip_code': fake.zipcode(),
            'country': fake.country(),
        }

        emergency_contact_2 = {
            'fullname': fake.name(),
            'relationship': 'Friend',
            'contact_number': fake.phone_number(),
            'street_address': fake.street_address(),
            'city': fake.city(),
            'state': fake.state(),
            'zip_code': fake.zipcode(),
            'country': fake.country(),
        }

        # Create emergency contacts for the profile
        EmergencyContacts.objects.create(user=user, **emergency_contact_1)
        EmergencyContacts.objects.create(user=user, **emergency_contact_2)

        user.save()
        create_doctors(user)
        print(f'Created User => {fullname} - {email} - {date_of_birth} ')

def create_doctors(user):
    fake = Faker()
    # create 50 doctors from the doctors whose ids if dividable by 2
    if user.id % 2 == 0:
        doctor = Doctor.objects.create(
            user=user,
            specialization=fake.job(),
            hospital=fake.company(),
            address=fake.street_address(),
            city=fake.city(),
            state=fake.state(),
            zip_code=fake.zipcode(),
            country=fake.country(),
            profile_image=fake.image_url(),
            experience=fake.text(),
            approved=True
        )
        doctor.save()
        create_availability(doctor)
        print(f'Created Doctor => {doctor.user.fullname} - {doctor.user.email} - {doctor.user.date_of_birth} ')


def create_availability(doctor):
    fake = Faker()
    # create 50 doctors from the doctors whose ids if dividable by 2
    availability = AvailabilityTimeTable.objects.create(
        doctor=doctor,
        date=fake.date(),
        start_time=fake.time(),
        end_time=fake.time(),
        is_available=True
    )
    availability.save()
    print(f'Created Availability => {availability.doctor.user.fullname} - {availability.date} - {availability.start_time} - {availability.end_time} - Available: {availability.is_available}')





if __name__ == "__main__":
    import os
    from django.core.wsgi import get_wsgi_application
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'CtrlApp.settings')
    application = get_wsgi_application()

    from faker import Faker
    import random
    from base.models import MyUser
    from user_profile.models import Profile, EmergencyContacts
    from doctors.models import Doctor, AvailabilityTimeTable
    main()
