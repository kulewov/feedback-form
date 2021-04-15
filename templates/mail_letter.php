<?php
include 'email/header.php';
?>
<div class="email-content">
    <div class="heading">
        <div class="user-info">
            <div class="name"><?= $_POST['name'] ?></div>
            <div class="email"><?= $_POST['email'] ?></div>
            <div class="birthday"><?= $_POST['date'] ?></div>
            <div class="phone"><?= $_POST['phone']  ?></div>
        </div>
    </div>
    <div class="content" style="border-top: 1px solid black;padding: 32px">
        <div class="message" style="max-width: 600px;margin: 0 auto">
            <?= $_POST['question'] ?>
        </div>
    </div>
</div>
<?php
include 'email/footer.php';