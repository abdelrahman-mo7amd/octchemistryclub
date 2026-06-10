async function handleMembershipForm(e) {
    e.preventDefault();

    const btn = document.getElementById('m-sub-btn');
    const txtEl = document.getElementById('m-sub-text');
    const spin = document.getElementById('m-sub-spin');
    const success = document.getElementById('m-success-box');
    const errorBox = document.getElementById('m-error-box');
    const errorMsg = document.getElementById('m-error-msg');

    const name = document.getElementById('m-name').value.trim();
    const email = document.getElementById('m-email').value.trim();
    const branch = document.getElementById('m-branch').value;
    const track = document.getElementById('m-track').value;
    const statement = document.getElementById('m-statement').value.trim();

    errorBox.style.display = 'none';
    success.style.display = 'none';
    btn.disabled = true;
    txtEl.style.display = 'none';
    spin.style.display = 'inline-block';

    try {
        const dup = await isDuplicateEmail('membership_applications', email);
        if (dup) {
            throw new Error('This email has already been used for a membership application.');
        }

        await saveMembershipApplication({name, email, branch, track, statement});
        trackFormSubmit('membership');

        spin.style.display = 'none';
        btn.style.display = 'none';
        success.style.display = 'block';
    } catch (err) {
        console.error('Membership submission error:' , err);
        spin.style.display = 'none';
        txtEl.style.display = 'inline';
        btn.disabled = false;
        errorMsg.textContent = err.message || "Something went wrong. Please try again.";
        errorBox.style.display = 'block';
    }
}

async function handleCSTForm(e) {
    e.preventDefault();

    const btn = document.getElementById('c-sub-btn');
    const txtEl = document.getElementById('c-sub-text');
    const spin = document.getElementById('c-sub-spin');
    const success = document.getElementById('c-success-box');
    const errorBox = document.getElementById('c-error-box');
    const errorMsg = document.getElementById('c-error-msg');

    const teamName = document.getElementById('c-team-name').value.trim();
    const leader = document.getElementById('c-leader').value.trim();
    const email = document.getElementById('c-email').value.trim();
    const school = document.getElementById('c-school').value.trim();
    const size = document.getElementById('c-size').value;
    const members = document.getElementById('c-members').value.trim();
    const topic = document.getElementById('c-topic').value.trim();

    const events = Array.from(document.querySelectorAll('.cst-event:checked')).map(cb => cb.value);

    if (events.length===0) {
        alert('Please select at least one competiton event.')
        return;
    }

    errorBox.style.display = 'none';
    success.style.display = 'none';
    btn.disabled = true;
    txtEl.style.display = 'none';
    spin.style.display = 'inline-block';

    try {
        const dup = await isDuplicateEmail('cst_registrations', email);
        if (dup) {
            throw new Error('This email has already been used to register a CST member.');
        }

        await saveCSTRegistration({
            teamName, leader, email, school, size, members, events, topic
        });
        trackFormSubmit('cst_registration');

        spin.style.display = 'none';
        btn.style.display = 'none';
        success.style.display = 'block';
    } catch (err) {
        console.error('CST submission error: ', err);
        spin.style.display = 'none';
        txtEl.style.display = 'inline';
        btn.disabled = false;
        errorMsg.textContent = err.message || 'Something went wrong. Please try again.';
        errorBox.style.display = 'block';
    }
}

