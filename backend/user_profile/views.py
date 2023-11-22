from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import (
    ProfileSerializer, EmergencyContactsSerializer, UpdateProfileSerializer,
    CreateEmergencyContactSerializer
    )
from .models import Profile, EmergencyContacts


class ProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
            Retrieve the profile of the authenticated user.

            Args:
                request (HttpRequest): The HTTP request object.

            Returns:
            JsonResponse: The profile data of the user if found, or an error message if not found.
        """
        try:
            user = request.user

            try:
                # Retrieve the profile of the user
                profile = Profile.objects.get(user=user)
                serializer = ProfileSerializer(profile)
                return Response(serializer.data, status=status.HTTP_200_OK)

            except:
                # Return an error response if the profile is not found
                return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
        except:
            # Return an error response if the user is not found
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        """
            Update the profile of the authenticated user.

            Args:
                request (HttpRequest): The HTTP request object.

            Returns:
            JsonResponse: The updated profile data of the user if successful, or an error message if not.
        """
        try:
            user = request.user
            profile = Profile.objects.get(user=user)
            serializer = UpdateProfileSerializer(profile, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Profile.DoesNotExist:
            return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request):
        """
        Update the profile of the authenticated user using the PUT method.

        Args:
            request (HttpRequest): The HTTP request object.

        Returns:
            JsonResponse: The updated profile data of the user if successful, or an error message if not.
        """
        try:
            user = request.user
            profile = Profile.objects.get(user=user)
            serializer = UpdateProfileSerializer(profile, data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Profile.DoesNotExist:
            return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request):
        """
        Delete the profile of the authenticated user and the associated user.

        Args:
            request (HttpRequest): The HTTP request object.

        Returns:
            JsonResponse: Success message if the profile and user are deleted, or an error message if not.
        """
        try:
            user = request.user
            profile = Profile.objects.get(user=user)
            user.delete()  # Delete the associated user
            profile.delete()  # Delete the profile

            return JsonResponse({"message": "Profile and user deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

        except Profile.DoesNotExist:
            return JsonResponse({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetUserProfile(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        """
            Retrieve the user profile of other users .

            Args:
                request (HttpRequest): The HTTP request object.

            Returns:
            JsonResponse: The profile data of the user if found, or an error message if not found.
        """
        try:
            user = MyUser.objects.get(id=user_id)

            try:
                # Retrieve the profile of the user
                profile = Profile.objects.get(user=user)
                serializer = ProfileSerializer(profile)
                return Response(serializer.data, status=status.HTTP_200_OK)

            except:
                # Return an error response if the profile is not found
                return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)
        except:
            # Return an error response if the user is not found
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


class EmergencyContactsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
            Retrieves the emergency contacts associated with the authenticated user.

            Parameters:
                request (Request): The HTTP request object.

            Returns:
                Response: The response object containing the serialized emergency contacts data.

            Raises:
                KeyError: If the user is not authenticated.
                Http404: If the user or the emergency contacts are not found.
        """
        try:
            user = request.user
            try:
                emergency_contacts = EmergencyContacts.objects.filter(user=user)
                print(emergency_contacts)
                serializer = EmergencyContactsSerializer(emergency_contacts, many=True)
                print(serializer.data)
                return Response(serializer.data, status=status.HTTP_200_OK)

            except:
                return Response({"error": "Emergency contacts not found"}, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        def post(self, request):
            """
                Creates a new emergency contact for the authenticated user.

                Parameters:
                    request (Request): The HTTP request object.

                Returns:
                    Response: The response object containing the serialized emergency contact data.

                Raises:
                    KeyError: If the user is not authenticated.
                    Http404: If the user or the emergency contact is not found.
            """
            try:
                user = request.user
                try:
                   serializer = CreateEmergencyContactSerializer(user, data=request.data, partial=True)

                   if serializer.is_valid():
                       serializer.save()
                       return Response(serializer.data, status=status.HTTP_201_CREATED)
                   else:
                       return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

                except:
                    return Response({"error": "Emergency contact not found"}, status=status.HTTP_404_NOT_FOUND)
            except:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)



