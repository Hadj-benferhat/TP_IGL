# Generated by Django 5.0 on 2023-12-27 14:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0002_article_integraltext_article_pdfurl_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='keyWords',
            field=models.CharField(default='', max_length=255),
        ),
    ]
