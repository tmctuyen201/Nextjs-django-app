# Generated by Django 5.0.4 on 2024-04-25 08:03

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("restaurant", "0003_alter_user_restaurant"),
    ]

    operations = [
        migrations.AddField(
            model_name="restaurant",
            name="rating",
            field=models.IntegerField(null=True),
        ),
    ]
